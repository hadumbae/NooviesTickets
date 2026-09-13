/**
 * @fileoverview Zod schema and type definition for validating latitude values.
 */

import {z} from "zod";
import {NumberValueSchema} from "../numbers";

/** Schema for validating latitude geographic coordinates within valid world bounds. */
export const LatitudeSchema = NumberValueSchema
    .min(-90, {message: "Latitude must be greater than or equal -90."})
    .max(90, {message: "Latitude must be less than or equal 90."});

/** Type representing a validated latitude value. */
export type Latitude = z.infer<typeof LatitudeSchema>;
