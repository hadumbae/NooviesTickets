/**
 * @fileoverview Zod schema and TypeScript type for validating seat layout types.
 */

import {z} from "zod";
import {TheatreSeatLayoutTypeConstant} from "./TheatreSeatLayoutTypeConstant";
import {ZodEnumParamHandler} from "../../../schema/enums/handler/ZodEnumParamHandler";

/** Zod schema for validating seat layout types. */
export const TheatreSeatLayoutTypeSchema = z.enum(TheatreSeatLayoutTypeConstant, ZodEnumParamHandler({
    invalidValue: "Invalid Seat Layout Type",
    invalidType: "Must Be A Valid Seat Layout Type String",
}));

/** TypeScript type representing a valid seat layout type. */
export type TheatreSeatLayoutType = z.infer<typeof TheatreSeatLayoutTypeSchema>;
