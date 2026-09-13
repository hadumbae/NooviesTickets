/** @fileoverview Zod schema and type definition for geographic longitude values. */

import {NumberValueSchema, preprocessToNumber} from "@noovies-tickets/common";
import {z} from "zod";

/** Schema for validating longitude values between -180 and 180. */
export const LongitudeSchema = preprocessToNumber(
    NumberValueSchema
        .min(-180, {message: "Longitude must be greater than or equal -180."})
        .max(180, {message: "Longitude must be less than or equal 180."})
);

/** A geographic longitude in decimal degrees. */
export type Longitude = z.infer<typeof LongitudeSchema>;