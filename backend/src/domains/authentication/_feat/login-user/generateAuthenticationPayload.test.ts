import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {
    type AuthTokenPayload, decodeAuthToken,
    generateAuthenticationHash,
    generateAuthenticationPayload
} from "@/domains/authentication";
import type {UserSchemaFields} from "@/domains/users";
import {mockUsers} from "@/domains/authentication/_validation/MockUsers";

vi.mock(
    "@/shared/_feat",
    async (importOriginal) => ({
        ...(await importOriginal()),
        getEnvVariables: vi.fn(() => ({CREDENTIALS_EXPIRY_DURATION: 15}))
    })
);

describe('generateAuthenticationPayload', () => {
    const validPayload = {user: mockUsers.adminUser, isAdmin: true, status: "ACTIVE"};

    beforeEach(async () => {
        vi.stubEnv("JWT_SECRET", "test-secret");
    })

    afterEach(async () => {
        vi.unstubAllEnvs()
    });

    it("valid payload, valid output", () => {
        const {authHash: outputHash, ...outputPayload} = generateAuthenticationPayload({user: mockUsers.adminUser as UserSchemaFields});

        expect(outputPayload).toEqual(validPayload);
        expect(decodeAuthToken(outputHash)).toEqual(validPayload);
    });

    it("invalid payload, error thrown", () => {
        expect.assertions(1);

        try {
            generateAuthenticationPayload({user: mockUsers.invalidUser as UserSchemaFields})
        } catch (error) {
            expect(error).toMatchObject({status: 500, message: "Unable to generate credentials. Please try again."});
        }
    });
});