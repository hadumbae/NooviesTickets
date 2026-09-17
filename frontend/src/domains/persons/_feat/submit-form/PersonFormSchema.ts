/**
 * @fileoverview Zod schemas and type definitions for validating person creation and update forms.
 */

import {z} from "zod";
import {
    ISO3166Alpha2CountryCodeSchema,
    NonFutureDateStringSchema,
    preprocessEmptyToUndefined,
    IDStringSchema,
    PersonBiographySchema,
    PersonNameSchema,
} from "@noovies-tickets/common";
import {AnyValues} from "@/shared/_types";

/** Zod schema for validating person form data. */
export const PersonFormSchema = z.object({
    _id: IDStringSchema.optional(),
    name: preprocessEmptyToUndefined(PersonNameSchema),
    biography: preprocessEmptyToUndefined(PersonBiographySchema),
    dob: preprocessEmptyToUndefined(NonFutureDateStringSchema),
    nationality: preprocessEmptyToUndefined(ISO3166Alpha2CountryCodeSchema),
});

/** Validated data structure for person forms. */
export type PersonFormData = z.infer<typeof PersonFormSchema>;

/** Type representing raw or partial input values for person form fields. */
export type PersonFormValues = AnyValues<PersonFormData>;
