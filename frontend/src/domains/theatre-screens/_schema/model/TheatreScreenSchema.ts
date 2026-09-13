/**
 * @fileoverview Zod validation schema and type definitions for a Theatre Screen entity.
 */

import {z} from "zod";
import {ScreenTypeSchema} from "@/domains/theatre-screens/_schema/fields";
import {IDStringSchema, PositiveNumberSchema, preprocessToNumber} from "@noovies-tickets/common";
import {NonEmptyStringSchema} from "@/common/_schemas";


/**
 * Schema for validating a Theatre Screen record.
 */
export const TheatreScreenSchema = z.object({
    _id: IDStringSchema.readonly(),
    name: NonEmptyStringSchema.max(255, "Name must be 255 characters or less."),
    capacity: preprocessToNumber(PositiveNumberSchema),
    screenType: ScreenTypeSchema,
    theatre: IDStringSchema,
    slug: NonEmptyStringSchema.readonly(),
});

/** Validated theatre screen entity. */
export type TheatreScreen = z.infer<typeof TheatreScreenSchema>;