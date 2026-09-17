/**
 * @fileoverview Zod schema and type definitions for geographic coordinate pair values.
 */

import {z} from "zod";
import {LongitudeSchema} from "./LongitudeSchema";
import {LatitudeSchema} from "./LatitudeSchema";

/** Schema for validating a tuple of longitude and latitude coordinate values. */
export const CoordinateValuesSchema = z.tuple(
    [LongitudeSchema, LatitudeSchema],
    {
        required_error: "Required",
        invalid_type_error: "Invalid Coordinates, Must Be An Array Of Two Coordinate Points",
        message: "Invalid Coordinates",
    },
);

/** Inferred TypeScript type for coordinate values. */
export type CoordinateValuesSchema = z.infer<typeof CoordinateValuesSchema>;