/**
 * @fileoverview Zod schema and TypeScript type definition for validating runtime environment variables.
 */

import {z} from "zod";
import {
    BooleanValueSchema,
    IANATimezoneSchema,
    IpSchema,
    NonNegativeNumberSchema,
    NumberValueSchema,
    PositiveNumberSchema,
    preprocessToBoolean,
    preprocessToNumber,
    StringValueSchema
} from "@noovies-tickets/common";

/** Zod validation schema for application environment variables. */
export const EnvironmentVariablesSchema = z.object({
    PORT: preprocessToNumber(NumberValueSchema),
    TZ: z.union([IANATimezoneSchema, z.literal("UTC")]),
    MONGO_DB_STRING: StringValueSchema,
    REDIS_CONNECT_STRING: StringValueSchema,
    CORS_ALLOWED_ORIGINS: StringValueSchema.transform(value => value.split(",").map(origin => origin.trim())),
    CLOUDINARY_CLOUD_NAME: StringValueSchema,
    CLOUDINARY_API_KEY: StringValueSchema,
    CLOUDINARY_API_SECRET: StringValueSchema,
    USE_MOCKED_IP: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
    MOCKED_CLIENT_IP: IpSchema,
    IPIFY_KEY: StringValueSchema,
    JWT_SECRET: StringValueSchema,
    REQUIRE_SECURE_COOKIES: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
    PAGINATION_PAGE_DEFAULT: preprocessToNumber(PositiveNumberSchema).catch(1),
    PAGINATION_PER_PAGE_DEFAULT: preprocessToNumber(PositiveNumberSchema).catch(10),
    CREDENTIALS_EXPIRY_DURATION: preprocessToNumber(PositiveNumberSchema).catch(15),
    REFRESH_EXPIRY_DURATION: preprocessToNumber(NonNegativeNumberSchema).catch(12),
    REFRESH_TOKEN_LIFETIME: preprocessToNumber(NonNegativeNumberSchema).catch(30),
});

/** Represents validated application environment variables derived from EnvironmentVariablesSchema. */
export type EnvironmentVariables = z.infer<typeof EnvironmentVariablesSchema>;