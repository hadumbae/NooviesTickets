/**
 * @fileoverview Zod schema for validating orientation enum values.
 */

import {z} from "zod";
import {OrientationConstant} from "./OrientationConstant";
import {ZodEnumParamHandler} from "../handler/ZodEnumParamHandler";

/** Zod schema for validating orientation enum values. */
export const OrientationEnumSchema = z.enum(OrientationConstant, ZodEnumParamHandler({
    invalidValue: "Invalid Value.",
    invalidType: "Must be a valid string.",
}));

/** Inferred type for orientation values. */
export type OrientationValues = z.infer<typeof OrientationEnumSchema>;
