/**
 * @fileoverview Zod schema for validating validation-error-code enum values.
 */

import {z} from "zod";
import {ValidationErrorCodeConstant} from "./ValidationErrorCodeConstant";
import {ZodEnumParamHandler} from "../handler/ZodEnumParamHandler";

/** Zod schema for validating validation-error-code enum values. */
export const ValidationErrorCodeSchema = z.enum(ValidationErrorCodeConstant, ZodEnumParamHandler({
    invalidValue: "Invalid Value.",
    invalidType: "Must be a valid string.",
}));

/** Inferred type for validation error code values. */
export type ValidationErrorCode = z.infer<typeof ValidationErrorCodeSchema>;
