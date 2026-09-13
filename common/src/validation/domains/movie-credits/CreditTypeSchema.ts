/**
 * @fileoverview Defines the schema and type for movie credit classifications.
 */

import {z} from "zod";
import {CreditTypeConstant} from "./CreditTypeConstant";
import {ZodEnumParamHandler} from "../../schema/enums/handler/ZodEnumParamHandler";

/** Zod schema for validating credit type strings against allowed constants. */
export const CreditTypeSchema = z.enum(CreditTypeConstant, ZodEnumParamHandler({
    invalidValue: "Invalid value.",
    invalidType: "Must be a valid string value.",
}));

/** TypeScript type inferred from the CreditTypeSchema. */
export type CreditType = z.infer<typeof CreditTypeSchema>;
