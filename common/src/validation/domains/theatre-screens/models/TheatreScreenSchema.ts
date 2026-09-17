/**
 * @fileoverview Zod validation schema and type definitions for a Theatre Screen entity.
 */

import {z} from "zod";
import {TheatreScreenNameSchema, TheatreScreenTypeSchema} from "../fields";
import {BaseModelDTOSchema} from "../../../schema/model/BaseModelDTOSchema";
import {IDStringSchema} from "../../../schema/additional-strings/id-strings/IDStringSchema";
import {NonEmptyStringSchema} from "../../../schema/strings/NonEmptyStringSchema";
import {PositiveNumberSchema} from "../../../schema/numbers/PositiveNumberSchema";
import {preprocessToNumber} from "../../../preprocessors/preprocessToNumber";

/**
 * Schema for validating a Theatre Screen record.
 */
export const TheatreScreenSchema = BaseModelDTOSchema.extend({
    name: TheatreScreenNameSchema,
    capacity: preprocessToNumber(PositiveNumberSchema),
    screenType: TheatreScreenTypeSchema,
    theatre: IDStringSchema,
    slug: NonEmptyStringSchema.readonly(),
});

/** Validated theatre screen entity. */
export type TheatreScreen = z.infer<typeof TheatreScreenSchema>;
