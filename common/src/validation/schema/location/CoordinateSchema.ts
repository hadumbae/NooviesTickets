/** @fileoverview Zod schema and type definition for GeoJSON Point coordinates. */

import {z} from "zod";
import {CoordinateValuesSchema} from "./CoordinateValuesSchema";

/** GeoJSON Point schema for validating coordinate pairs. */
export const CoordinateSchema = z.object({
    type: z.literal("Point"),
    coordinates: CoordinateValuesSchema,
}, {message: "Must Be A Coordinate Object"});

/** A geographic coordinate pair representing a point on the Earth's surface. */
export type Coordinate = z.infer<typeof CoordinateSchema>;
