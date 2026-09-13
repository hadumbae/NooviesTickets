/**
 * @fileoverview Zod schema and TypeScript type definition for validating runtime environment variables.
 */

import {z} from "zod";
import {IANATimezoneSchema} from "@noovies-tickets/common";
import {NumberValueSchema} from "@noovies-tickets/common";
import {StringValueSchema, preprocessToNumber} from "@noovies-tickets/common";
import {PositiveNumberSchema} from "@noovies-tickets/common";
import {IpSchema} from "@/shared/schema/strings/IPSchema";
import {NonNegativeNumberSchema} from "@noovies-tickets/common";
import {CoercedBooleanValueSchema} from "@/shared/_schema/booleans/CoercedBooleanValueSchema";

/** Zod validation schema for application environment variables. */
export const EnvironmentVariablesSchema = z.object({
    PORT: preprocessToNumber(NumberValueSchema),
    TZ: z.union([IANATimezoneSchema, z.literal("UTC")]),
    MONGO_DB_STRING: StringValueSchema,
    CORS_ALLOWED_ORIGINS: StringValueSchema.transform(value => value.split(",").map(origin => origin.trim())),
    CLOUDINARY_CLOUD_NAME: StringValueSchema,
    CLOUDINARY_API_KEY: StringValueSchema,
    CLOUDINARY_API_SECRET: StringValueSchema,
    USE_MOCKED_IP: CoercedBooleanValueSchema,
    MOCKED_CLIENT_IP: IpSchema,
    IPIFY_KEY: StringValueSchema,
    JWT_SECRET: StringValueSchema,
    REQUIRE_SECURE_COOKIES: CoercedBooleanValueSchema,
    PAGINATION_PAGE_DEFAULT: preprocessToNumber(PositiveNumberSchema).catch(1),
    PAGINATION_PER_PAGE_DEFAULT: preprocessToNumber(PositiveNumberSchema).catch(10),
    CREDENTIALS_EXPIRY_DURATION: preprocessToNumber(PositiveNumberSchema).catch(15),
    REFRESH_EXPIRY_DURATION: preprocessToNumber(NonNegativeNumberSchema).catch(12),
    REFRESH_TOKEN_LIFETIME: preprocessToNumber(NonNegativeNumberSchema).catch(30),
});

/** Represents validated application environment variables derived from EnvironmentVariablesSchema. */
export type EnvironmentVariables = z.infer<typeof EnvironmentVariablesSchema>;