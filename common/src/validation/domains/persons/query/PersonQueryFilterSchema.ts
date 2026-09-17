/**
 * @fileoverview Zod schema and type definitions for person query filtering options.
 */

import {z} from "zod";
import {IDStringSchema} from "../../../schema/additional-strings/id-strings/IDStringSchema";
import {TrimmedStringSchema} from "../../../schema/strings/TrimmedStringSchema";
import {DateOnlyStringSchema} from "../../../schema/date-time/DateOnlyStringSchema";
import {ISO3166Alpha2CountryCodeSchema} from "../../../schema/enums/country/ISO3166Alpha2CountryCodeSchema";
import {preprocessOptionalField} from "../../../preprocessors/preprocessOptionalField";

/** Zod schema for validating person query filter parameters. */
export const PersonQueryFilterSchema = z.object({
    _id: preprocessOptionalField(IDStringSchema),
    name: preprocessOptionalField(TrimmedStringSchema),
    dob: preprocessOptionalField(DateOnlyStringSchema),
    nationality: preprocessOptionalField(ISO3166Alpha2CountryCodeSchema),
});

/** Type representing valid filter parameters for person queries. */
export type PersonQueryFilters = z.infer<typeof PersonQueryFilterSchema>;
