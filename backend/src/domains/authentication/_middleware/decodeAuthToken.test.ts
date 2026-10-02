import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {type AuthTokenPayload, decodeAuthToken, generateAuthenticationHash} from "@/domains/authentication";
import jwt from "jsonwebtoken";
import {mockUsers} from "@/domains/authentication/_validation/MockUsers";

vi.mock("@/shared/_feat", async (importOriginal) => ({
    ...(await importOriginal()),
    getEnvVariables: vi.fn(() => ({CREDENTIALS_EXPIRY_DURATION: 15})),
}));

describe("decodeAuthToken", () => {
    let adminHash: string;
    const adminPayload = {user: mockUsers.adminUser, isAdmin: true, status: "ACTIVE"};

    let clientHash: string;
    const clientPayload = {user: mockUsers.clientUser, isAdmin: false, status: "ACTIVE"};

    beforeEach(async () => {
        vi.stubEnv("JWT_SECRET", "some-secret");
        adminHash = generateAuthenticationHash({payload: adminPayload as AuthTokenPayload});
        clientHash = generateAuthenticationHash({payload: clientPayload as AuthTokenPayload});
    });

    afterEach(async () => {
        vi.unstubAllEnvs();
    });

    it("valid inputs, valid output", () => {
        const decodedPayload = decodeAuthToken(adminHash);
        expect(decodedPayload).toEqual(adminPayload);
    });

    it("different input, valid but different output", () => {
        const decodedPayload = decodeAuthToken(clientHash);
        expect(decodedPayload).toEqual(clientPayload);
    });

    it("different secret, invalid signature", () => {
        const wrongSecretHash = jwt.sign(adminPayload, "the-wrong-secret", {expiresIn: "15m"});
        expect.assertions(1);

        try {
            decodeAuthToken(wrongSecretHash);
        } catch (error: unknown) {
            expect(error).toMatchObject({
                status: 401,
                message: "Authorization failed, error: invalid signature",
            });
        }
    });

    it("same secret, expired", () => {
        const wrongSecretHash = jwt.sign(adminPayload, "some-secret", {expiresIn: "-15m"});
        expect.assertions(1);

        try {
            decodeAuthToken(wrongSecretHash);
        } catch (error: unknown) {
            expect(error).toMatchObject({
                status: 401,
                message: "Authorization failed, error: jwt expired",
            });
        }
    });
});