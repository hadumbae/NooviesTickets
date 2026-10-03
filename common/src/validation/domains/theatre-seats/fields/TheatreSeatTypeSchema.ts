/**
 * @fileoverview Zod schema and TypeScript type for validating seat types.
 */

import {z} from "zod";
import {TheatreSeatTypeConstant} from "./TheatreSeatTypeConstant";
import {ZodEnumParamHandler} from "../../../schema/enums/handler/ZodEnumParamHandler";

/** Zod schema for validating seat types. */
export const TheatreSeatTypeSchema = z.enum(TheatreSeatTypeConstant, ZodEnumParamHandler({
    invalidValue: "Invalid Seat Type.",
    invalidType: "Must be a valid Seat Type string.",
}));

/** TypeScript type representing a valid seat type. */
export type TheatreSeatType = z.infer<typeof TheatreSeatTypeSchema>;
