/**
 * @fileoverview Zod schema and type definition for ISO 639-1 language codes.
 */

import {z} from "zod";
import {ISO6391CodeConstant} from "./ISO6391CodeConstant";
import {ZodEnumParamHandler} from "../handler/ZodEnumParamHandler";

/** Zod enum schema for validating ISO 639-1 language codes. */
export const ISO6391LanguageCodeSchema = z.enum(
    ISO6391CodeConstant,
    ZodEnumParamHandler({
        invalidValue: "Invalid Language",
        invalidType: "Must Be A Valid Language Code",
    }),
);

/** Type representing a valid ISO 639-1 language code. */
export type ISO6391LanguageCode = z.infer<typeof ISO6391LanguageCodeSchema>;
