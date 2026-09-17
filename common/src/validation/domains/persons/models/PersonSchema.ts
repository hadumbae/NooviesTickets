/**
 * @fileoverview Defines the schema and type for person entities.
 */

import {z} from "zod";
import {PersonNameSchema, PersonBiographySchema} from "../fields";
import {BaseModelDTOSchema} from "../../../schema/model/BaseModelDTOSchema";
import {SlugStringSchema} from "../../../schema/additional-strings/slug-strings/SlugString";
import {UTCDayOnlyDateTimeSchema} from "../../../schema/date-time/UTCDayOnlyDateTimeSchema";
import {ISO3166Alpha2CountryCodeSchema} from "../../../schema/enums/country/ISO3166Alpha2CountryCodeSchema";
import {CloudinaryImageSchema} from "../../../schema/cloudinary/CloudinaryImageSchema";

/** Zod schema for validating person objects. */
export const PersonSchema = BaseModelDTOSchema.extend({
    slug: SlugStringSchema,
    name: PersonNameSchema,
    biography: PersonBiographySchema,
    dob: UTCDayOnlyDateTimeSchema,
    nationality: ISO3166Alpha2CountryCodeSchema,
    profileImage: CloudinaryImageSchema.nullable().optional(),
});

/** Represents a person entity. */
export type Person = z.infer<typeof PersonSchema>;
