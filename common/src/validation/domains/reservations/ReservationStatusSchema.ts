/**
 * @fileoverview Zod enum schema for validating reservation status values.
 */

import {z} from "zod";
import {ReservationStatusConstant} from "./ReservationStatusConstant";

/** Zod schema for validating reservation status strings against allowed constants. */
export const ReservationStatusSchema = z.enum(
    ReservationStatusConstant,
    {
        required_error: "Required.",
        invalid_type_error: `Invalid value. Must be: ${ReservationStatusConstant.join(", ")}`,
    }
);

/** Type inferred from the ReservationStatusSchema. */
export type ReservationStatus = z.infer<typeof ReservationStatusSchema>;
