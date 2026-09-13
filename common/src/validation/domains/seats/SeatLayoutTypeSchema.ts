/**
 * @fileoverview Zod schema and TypeScript type for validating seat layout types.
 */

import {z} from "zod";
import {SeatLayoutTypeConstant} from "./SeatLayoutTypeConstant";
import {ZodEnumParamHandler} from "../../schema/enums/handler/ZodEnumParamHandler";

/** Zod schema for validating seat layout types. */
export const SeatLayoutTypeSchema = z.enum(SeatLayoutTypeConstant, ZodEnumParamHandler({
    invalidValue: "Invalid Seat Layout Type.",
    invalidType: "Must be a valid Seat Layout Type string.",
}));

/** TypeScript type representing a valid seat layout type. */
export type SeatLayoutType = z.infer<typeof SeatLayoutTypeSchema>;
