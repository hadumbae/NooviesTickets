/**
 * @fileoverview Zod schema defining standard creation and update timestamp fields for models.
 */

import {z} from "zod";
import {MongooseTimestampDateTimeSchema} from "./MongooseTimestampDateTimeSchema";

/** Zod schema for model creation and update timestamps. */
export const MongooseTimestampsSchema = z.object({
    createdAt: MongooseTimestampDateTimeSchema,
    updatedAt: MongooseTimestampDateTimeSchema,
});

/** Type definition for model timestamp fields. */
export type MongooseTimestamps = z.infer<typeof MongooseTimestampsSchema>;
