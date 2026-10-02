import {afterAll, beforeAll, beforeEach, describe, expect, it} from "vitest";
import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";
import {UserModel} from "@/domains/users";
import {RefreshTokenModel} from "@/domains/authentication";
import {mockUsers} from "@/domains/authentication/_validation/MockUsers";
import {DateTime} from "luxon";
import crypto from "crypto";
import {createRefreshTokenHash} from "@/domains/authentication/_feat/manage-refresh-tokens/createRefreshTokenHash";
import {validateStaleToken} from "@/domains/authentication/_feat/manage-refresh-tokens/validateStaleToken";

const mockExpiresAt = DateTime.now().plus({days: 30}).toJSDate();
const mockIP = "172.217.16.142";
const mockFamily = crypto.randomUUID();

async function createMockData() {
    const user = await UserModel.create({
        ...mockUsers.adminUser,
        password: "abc123abc123abc123abc",
    });

    const hashOne = createRefreshTokenHash();
    const hashTwo = createRefreshTokenHash();
    const hashThree = createRefreshTokenHash();

    const tokenOne = await RefreshTokenModel.create({
        tokenHash: hashOne.tokenHash,
        user: user._id,
        expiresAt: mockExpiresAt,
        family: mockFamily,
        ip: mockIP,
        revoked: false,
    });

    const tokenTwo = await RefreshTokenModel.create({
        tokenHash: hashTwo.tokenHash,
        user: user._id,
        expiresAt: mockExpiresAt,
        family: mockFamily,
        ip: mockIP,
        revoked: true,
    });

    const tokenThree = await RefreshTokenModel.create({
        tokenHash: hashThree.tokenHash,
        user: user._id,
        expiresAt: mockExpiresAt,
        family: mockFamily,
        ip: mockIP,
        revoked: false,
    });

    return {
        hashOne,
        tokenOne,
        hashTwo,
        tokenTwo,
        hashThree,
        tokenThree,
    }
}

describe("validateStaleToken", () => {
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    beforeEach(async () => {
        await UserModel.deleteMany({});
        await RefreshTokenModel.deleteMany({});
    });

    it('should return a valid document on a valid token', async () => {
        const {tokenOne, hashOne} = await createMockData();
        const staleToken = await validateStaleToken({token: hashOne.rawToken});

        expect(staleToken._id.equals(tokenOne._id)).toBe(true);
        expect(staleToken.user.equals(tokenOne.user)).toBe(true);
        expect(staleToken.tokenHash).toBe(tokenOne.tokenHash);
        expect(staleToken.revoked).toBe(tokenOne.revoked);
        expect(staleToken.family).toBe(mockFamily);
        expect(staleToken.ip).toBe(mockIP);
    });

    it('should throw an error on an invalid token', async () => {
        expect.assertions(1);

        const {rawToken} = createRefreshTokenHash();

        try {
            await validateStaleToken({token: rawToken});
        } catch (error) {
            expect(error).toMatchObject({status: 401, message: "Invalid. Refresh Token Required."});
        }
    });

    it('should throw an error on a revoked token', async () => {
        const {hashTwo: {rawToken}} = await createMockData();

        await expect(validateStaleToken({token: rawToken}))
            .rejects
            .toMatchObject({status: 403, message: "Forbidden. Token Already Revoked."});
    });

    it('should revoke family on revoked token', async () => {
        const {
            tokenOne,
            tokenTwo,
            tokenThree,
            hashTwo: {rawToken},
        } = await createMockData();

        await expect(validateStaleToken({token: rawToken}))
            .rejects
            .toMatchObject({status: 403, message: "Forbidden. Token Already Revoked."});

        const staleTokenOne = await RefreshTokenModel.findById(tokenOne._id);
        expect(staleTokenOne).not.toEqual(null);
        expect(staleTokenOne!.family).toBe(mockFamily);
        expect(staleTokenOne!.revoked).toBe(true);

        const staleTokenTwo = await RefreshTokenModel.findById(tokenTwo._id);
        expect(staleTokenTwo).not.toEqual(null);
        expect(staleTokenTwo!.family).toBe(mockFamily);
        expect(staleTokenTwo!.revoked).toBe(true);

        const staleTokenThree = await RefreshTokenModel.findById(tokenThree._id);
        expect(staleTokenThree).not.toEqual(null);
        expect(staleTokenThree!.family).toBe(mockFamily);
        expect(staleTokenThree!.revoked).toBe(true);

    });
});