/**
 * @fileoverview Zod validation schema and type definitions for a Theatre Screen entity.
 */

import {z} from "zod";
import {TheatreScreenTypeSchema} from "@noovies-tickets/common";
import {IDStringSchema, PositiveNumberSchema, preprocessToNumber} from "@noovies-tickets/common";
import {NonEmptyStringSchema} from "@noovies-tickets/common";


/**
 * Schema for validating a Theatre Screen record.
 */
export const TheatreScreenSchema = z.object({
    _id: IDStringSchema.readonly(),
    name: NonEmptyStringSchema.max(255, "Name must be 255 characters or less."),
    capacity: preprocessToNumber(PositiveNumberSchema),
    screenType: TheatreScreenTypeSchema,
    theatre: IDStringSchema,
    slug: NonEmptyStringSchema.readonly(),
});

/** Validated theatre screen entity. */
export type TheatreScreen = z.infer<typeof TheatreScreenSchema>;