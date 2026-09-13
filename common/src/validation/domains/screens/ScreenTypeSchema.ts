/**
 * @fileoverview Zod schema and TypeScript type for validating theatre screen formats.
 */

import {z} from "zod";
import {ScreenTypeConstant} from "./ScreenTypeConstant";
import {ZodEnumParamHandler} from "../../schema/enums/handler/ZodEnumParamHandler";

/** Zod schema for validating and restricting string values to known theatre screen types. */
export const ScreenTypeSchema = z.enum(ScreenTypeConstant, ZodEnumParamHandler({
    invalidValue: "Invalid Screen Type.",
    invalidType: "Must be a screen type.",
}));

/** TypeScript type representing a validated screen type format. */
export type ScreenType = z.infer<typeof ScreenTypeSchema>;
