/**
 * @fileoverview Zod schema for ISO 4217 currency codes.
 */

import {z} from "zod";
import {ISO4217CurrencyCodesConstant} from "./ISO4217CurrencyCodesConstant";
import {ZodEnumParamHandler} from "../handler/ZodEnumParamHandler";

/** Zod enum schema for validating ISO 4217 currency codes. */
export const ISO4217CurrencyCodeSchema = z.enum(
    ISO4217CurrencyCodesConstant,
    ZodEnumParamHandler({
        invalidValue: "Invalid Currency Code",
        invalidType: "Must Be A Valid Currency Code",
    }),
);

/** Type representing a valid ISO 4217 currency code. */
export type ISO4217CurrencyCode = z.infer<typeof ISO4217CurrencyCodeSchema>;
