/**
 * @fileoverview Zod schema for validating http-response-error-code enum values.
 */

import {z} from "zod";
import {HttpResponseErrorCodeConstant} from "./HttpResponseErrorCodeConstant";
import {ZodEnumParamHandler} from "../handler/ZodEnumParamHandler";

/** Zod schema for validating http-response-error-code enum values. */
export const HttpResponseErrorCodeSchema = z.enum(HttpResponseErrorCodeConstant, ZodEnumParamHandler({
    invalidValue: "Invalid Value.",
    invalidType: "Must be a valid string.",
}));

/** Inferred type for HTTP response error code values. */
export type HttpResponseErrorCode = z.infer<typeof HttpResponseErrorCodeSchema>;
