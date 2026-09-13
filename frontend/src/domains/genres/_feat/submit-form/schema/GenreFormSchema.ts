/**
 * @fileoverview Validation schemas and types for Genre form submission.
 */

import {z} from "zod";
import {CoercedBooleanValueSchema} from "@/common/_schemas";
import {IDStringSchema, preprocessEmptyToUndefined} from "@noovies-tickets/common";
import {AnyValues} from "@/common/_types";
import {GenreDescriptionSchema, GenreNameSchema} from "@/domains/genres/_schema/fields";

/** Zod schema for validating and transforming Genre form data. */
export const GenreFormSchema = z.object({
    _id: IDStringSchema.optional(),
    name: preprocessEmptyToUndefined(GenreNameSchema),
    description: preprocessEmptyToUndefined(GenreDescriptionSchema),
    isFeatured: preprocessEmptyToUndefined(CoercedBooleanValueSchema),
});

/** Validated Genre data prepared for API submission. */
export type GenreFormData = z.infer<typeof GenreFormSchema>;

/** Raw input values for the Genre form. */
export type GenreFormValues = AnyValues<GenreFormData>;