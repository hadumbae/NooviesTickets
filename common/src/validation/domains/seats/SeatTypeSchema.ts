/**
 * @fileoverview Zod schema and TypeScript type for validating seat types.
 */

import {z} from "zod";
import {SeatTypeConstant} from "./SeatTypeConstant";
import {ZodEnumParamHandler} from "../../schema/enums/handler/ZodEnumParamHandler";

/** Zod schema for validating seat types. */
export const SeatTypeSchema = z.enum(SeatTypeConstant, ZodEnumParamHandler({
    invalidValue: "Invalid Seat Type.",
    invalidType: "Must be a valid Seat Type string.",
}));

/** TypeScript type representing a valid seat type. */
export type SeatType = z.infer<typeof SeatTypeSchema>;
