/**
 * @fileoverview Zod schema for validating the core theatre domain model.
 */

import {z} from "zod";
import {TheatreNameSchema, TheatreSeatCapacitySchema} from "../fields";
import {SlugStringSchema} from "../../../schema/additional-strings/slug-strings/SlugString";
import {LocationSchema} from "../../../schema/location/LocationSchema";
import {BaseModelDTOSchema} from "../../../schema/model/BaseModelDTOSchema";

/**
 * Validates the core theatre model including identification, naming, location, and capacity metrics.
 */
export const TheatreSchema = BaseModelDTOSchema.extend({
    name: TheatreNameSchema,
    location: LocationSchema,
    seatCapacity: TheatreSeatCapacitySchema,
    slug: SlugStringSchema.readonly(),
});

/**
 * Type representing a single theatre object, corresponding to the ITheatre interface.
 */
export type Theatre = z.infer<typeof TheatreSchema>;
