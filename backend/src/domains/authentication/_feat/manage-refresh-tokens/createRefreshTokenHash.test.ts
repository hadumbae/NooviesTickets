import {describe, it, expect} from "vitest";
import {createRefreshTokenHash} from "@/domains/authentication/_feat/manage-refresh-tokens/createRefreshTokenHash";

describe("createRefreshTokenHash", () => {
    it('token hashed does not equal to raw token', () => {
        const {tokenHash, rawToken} = createRefreshTokenHash();
        expect(tokenHash).not.toBe(rawToken);
    });
})