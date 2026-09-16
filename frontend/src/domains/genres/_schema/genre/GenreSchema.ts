/**
 * @fileoverview Zod validation schema and TypeScript type definition for the Genre entity.
 */

import {z} from "zod";
import {BooleanValueSchema, IDStringSchema, NonNegativeNumberSchema} from "@noovies-tickets/common";
import {NonEmptyStringSchema} from "@noovies-tickets/common";
import {CloudinaryImageSchema} from "@noovies-tickets/common";
import {GenreDescriptionSchema, GenreNameSchema} from "@noovies-tickets/common";

/** Zod validation schema for Genre documents. */
export const GenreSchema = z.object({
    _id: IDStringSchema.readonly(),
    name: GenreNameSchema,
    description: GenreDescriptionSchema,
    image: CloudinaryImageSchema.nullable().readonly().optional(),
    slug: NonEmptyStringSchema.readonly(),
    movieCount: NonNegativeNumberSchema,
    isFeatured: BooleanValueSchema.catch(false),
});

/** TypeScript type inferred from GenreSchema. */
export type Genre = z.infer<typeof GenreSchema>;