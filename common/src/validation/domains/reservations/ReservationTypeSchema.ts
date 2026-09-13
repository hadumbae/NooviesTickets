/**
 * @fileoverview Zod enum schema and type definition for reservation types.
 */

import {z} from "zod";
import {ReservationTypeConstant} from "./ReservationTypeConstant";
import {ZodEnumParamHandler} from "../../schema/enums/handler/ZodEnumParamHandler";

/** Zod schema for validating reservation type strings against allowed constants. */
export const ReservationTypeSchema = z.enum(ReservationTypeConstant, ZodEnumParamHandler({
    invalidValue: "Invalid Value.",
    invalidType: "Must be a valid string.",
}));

/** TypeScript type inferred from the reservation type enum schema. */
export type ReservationType = z.infer<typeof ReservationTypeSchema>;
