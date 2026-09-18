/**
 * @fileoverview Zod schema and type definitions for filtering movie queries.
 */

import {z} from "zod";
import {IDStringSchema} from "../../../schema/additional-strings/id-strings/IDStringSchema";
import {TrimmedStringSchema} from "../../../schema/strings/TrimmedStringSchema";
import {DateOnlyStringSchema} from "../../../schema/date-time/DateOnlyStringSchema";
import {ISO3166Alpha2CountryCodeSchema} from "../../../schema/enums/country/ISO3166Alpha2CountryCodeSchema";
import {BooleanValueSchema} from "../../../schema/booleans/BooleanValueSchema";
import {preprocessOptionalField} from "../../../preprocessors/preprocessOptionalField";
import {preprocessToBoolean} from "../../../preprocessors/preprocessToBoolean";

/** Zod schema defining available filter parameters for querying movie documents. */
export const MovieQueryFilterSchema = z.object({
    _id: preprocessOptionalField(IDStringSchema),
    title: preprocessOptionalField(TrimmedStringSchema),
    originalTitle: preprocessOptionalField(TrimmedStringSchema),
    releaseDate: preprocessOptionalField(DateOnlyStringSchema),

    isReleased: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
    isAvailable: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
    country: preprocessOptionalField(ISO3166Alpha2CountryCodeSchema),
});

/** Type representing movie query filter criteria. */
export type MovieQueryFilters = z.infer<typeof MovieQueryFilterSchema>;
