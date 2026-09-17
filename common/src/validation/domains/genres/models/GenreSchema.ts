/**
 * @fileoverview Zod validation schema and TypeScript type definition for the Genre entity.
 */

import {z} from "zod";
import {GenreDescriptionSchema, GenreNameSchema} from "../fields";
import {BooleanValueSchema} from "../../../schema/booleans/BooleanValueSchema";
import {IDStringSchema} from "../../../schema/additional-strings/id-strings/IDStringSchema";
import {NonNegativeNumberSchema} from "../../../schema/numbers/NonNegativeNumberSchema";
import {NonEmptyStringSchema} from "../../../schema/strings/NonEmptyStringSchema";
import {CloudinaryImageSchema} from "../../../schema/cloudinary/CloudinaryImageSchema";

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
