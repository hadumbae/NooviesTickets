/**
 * @fileoverview Zod validation schema for the showing details form.
 */

import {z} from "zod";
import {
    CityStringSchema,
    IDStringSchema,
    ISO3166Alpha2CountryCodeSchema,
    preprocessEmptyToUndefined,
    preprocessOptionalField,
    StateStringSchema
} from "@noovies-tickets/common";

/**
 * Zod schema for validating showing form identifiers and location context.
 */
export const ShowingFormDetailSchema = z.object({
    _id: IDStringSchema.optional().readonly(),
    movie: preprocessEmptyToUndefined(IDStringSchema),
    screen: preprocessEmptyToUndefined(IDStringSchema),
    theatre: preprocessEmptyToUndefined(IDStringSchema),
    theatreCity: preprocessOptionalField(CityStringSchema),
    theatreState: preprocessOptionalField(StateStringSchema),
    theatreCountry: preprocessOptionalField(ISO3166Alpha2CountryCodeSchema),
});

/**
 * Inferred TypeScript type for showing detail form values.
 */
export type ShowingFormDetails = z.infer<typeof ShowingFormDetailSchema>;