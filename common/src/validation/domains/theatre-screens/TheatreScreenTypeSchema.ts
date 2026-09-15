/**
 * @fileoverview Zod schema and TypeScript type for validating theatre screen formats.
 */

import {z} from "zod";
import {TheatreScreenTypeConstant} from "./TheatreScreenTypeConstant";
import {ZodEnumParamHandler} from "../../schema/enums/handler/ZodEnumParamHandler";

/** Zod schema for validating and restricting string values to known theatre screen types. */
export const TheatreScreenTypeSchema = z.enum(TheatreScreenTypeConstant, ZodEnumParamHandler({
    invalidValue: "Invalid Screen Type.",
    invalidType: "Must be a screen type.",
}));

/** TypeScript type representing a validated screen type format. */
export type TheatreScreenType = z.infer<typeof TheatreScreenTypeSchema>;
