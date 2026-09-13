/**
 * @fileoverview Defines the Zod schema and TypeScript type for SeatMap status values.
 */

import {z} from "zod";
import {SeatMapStatusConstant} from "./SeatMapStatusConstant";
import {ZodEnumParamHandler} from "../../schema/enums/handler/ZodEnumParamHandler";

/** Zod schema for validating SeatMap status strings against predefined constants. */
export const SeatMapStatusSchema = z.enum(SeatMapStatusConstant, ZodEnumParamHandler({
    invalidValue: "Must be a valid Seat Map Status.",
    invalidType: "Must be a valid Seat Map Status string.",
}));

/** TypeScript type representing all valid SeatMap status values. */
export type SeatMapStatus = z.infer<typeof SeatMapStatusSchema>;
