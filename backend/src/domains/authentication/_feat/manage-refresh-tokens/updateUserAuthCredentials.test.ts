import {afterAll, beforeAll, beforeEach, describe, expect, it} from "vitest";
import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose, {Types} from "mongoose";
import {RefreshTokenModel, updateUserAuthCredentials} from "@/domains/authentication";
import {UserModel} from "@/domains/users";
import {DateTime} from "luxon";
import {createRefreshTokenHash} from "@/domains/authentication/_feat/manage-refresh-tokens/createRefreshTokenHash";
import crypto from "crypto";
import {mockUsers} from "@/domains/authentication/_validation/MockUsers";
import {generateObjectIdPlaceholder} from "@noovies-tickets/common";
import {validateStaleToken} from "@/domains/authentication/_feat/manage-refresh-tokens/validateStaleToken";

const mockExpiresAt = DateTime.now().plus({days: 30}).toJSDate();
const mockIP = "172.217.16.142";
const mockFamily = crypto.randomUUID();

async function createMockToken() {
    const user = await UserModel.create({...mockUsers.adminUser, password: "abc123abc123abc123abc"});
    const {rawToken, tokenHash} = createRefreshTokenHash();
    const staleToken = await RefreshTokenModel.create({
        tokenHash,
        user: user._id,
        expiresAt: mockExpiresAt,
        family: mockFamily,
        ip: mockIP,
        revoked: false,
    });

    return {
        user,
        rawToken,
        tokenHash,
        staleToken,
    }
}

describe("updateUserAuthCredentials", () => {
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });

    beforeEach(async () => {
        await UserModel.deleteMany({});
        await RefreshTokenModel.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it('valid values, check output', async () => {
        const {rawToken, user} = await createMockToken();

        const updateToken = await updateUserAuthCredentials({ipAddress: mockIP, incomingToken: rawToken});

        expect(updateToken.user).toEqual({...mockUsers.adminUser, _id: user._id});
        expect(updateToken.isAdmin).toEqual(true);
        expect(updateToken.status).toEqual("ACTIVE");
    });

    it('valid values, check token', async () => {
        const {rawToken, tokenHash, user} = await createMockToken();

        const updateToken = await updateUserAuthCredentials({ipAddress: mockIP, incomingToken: rawToken});
        expect(updateToken.refreshToken.tokenHash).not.toBe(tokenHash);
        expect(updateToken.refreshToken.user.equals(user._id)).toBe(true);
        expect(updateToken.refreshToken.revoked).toBe(false);
        expect(updateToken.refreshToken.family).toBe(mockFamily);
        expect(updateToken.refreshToken.ip).toBe(mockIP);
    });

    it('valid values, check token existence', async () => {
        const {rawToken, staleToken} = await createMockToken();

        await updateUserAuthCredentials({ipAddress: mockIP, incomingToken: rawToken});
        const checkToken = await RefreshTokenModel.findById(staleToken._id);

        expect(checkToken).not.toEqual(null);
        expect(checkToken!.revoked).toBe(true);
        expect(checkToken!.ip).toBe(mockIP);
        expect(checkToken!.family).toBe(mockFamily);
    });

    it('invalid user, throws error', async () => {
        const {rawToken, tokenHash} = createRefreshTokenHash();
        await RefreshTokenModel.create({
            user: Types.ObjectId.createFromHexString(generateObjectIdPlaceholder()),
            expiresAt: mockExpiresAt,
            family: mockFamily,
            ip: mockIP,
            revoked: false,
            tokenHash,
        });

        await expect(updateUserAuthCredentials({ipAddress: mockIP, incomingToken: rawToken}))
            .rejects
            .toMatchObject({status: 403, message: "Forbidden. Unknown user."});
    });
})