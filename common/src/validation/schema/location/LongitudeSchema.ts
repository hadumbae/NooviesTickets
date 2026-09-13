/**
 * @fileoverview Zod schema and type definition for validating longitude values.
 */

import {z} from "zod";
import {NumberValueSchema} from "../numbers";

/** Schema for validating longitude geographic coordinates within valid world bounds. */
export const LongitudeSchema = NumberValueSchema
    .min(-180, {message: "Longitude must be greater than or equal -180."})
    .max(180, {message: "Longitude must be less than or equal 180."});

/** Type representing a validated longitude value. */
export type Longitude = z.infer<typeof LongitudeSchema>;
