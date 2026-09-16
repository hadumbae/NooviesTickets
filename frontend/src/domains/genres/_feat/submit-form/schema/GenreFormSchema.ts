/**
 * @fileoverview Validation schemas and types for Genre form submission.
 */

import {z} from "zod";
import {IDStringSchema, preprocessEmptyToUndefined, GenreDescriptionSchema, GenreNameSchema} from "@noovies-tickets/common";
import {URLParamBooleanSchema} from "@/shared/_schemas/boolean";
import {AnyValues} from "@/shared/_types";

/** Zod schema for validating and transforming Genre form data. */
export const GenreFormSchema = z.object({
    _id: IDStringSchema.optional(),
    name: preprocessEmptyToUndefined(GenreNameSchema),
    description: preprocessEmptyToUndefined(GenreDescriptionSchema),
    isFeatured: preprocessEmptyToUndefined(URLParamBooleanSchema),
});

/** Validated Genre data prepared for API submission. */
export type GenreFormData = z.infer<typeof GenreFormSchema>;

/** Raw input values for the Genre form. */
export type GenreFormValues = AnyValues<GenreFormData>;