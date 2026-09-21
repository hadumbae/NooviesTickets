/**
 * @fileoverview Zod schema for validating showing language configurations in forms.
 */

import {z} from "zod";
import {preprocessEmptyToUndefined, ISO6391LanguageCodeSchema, generateArraySchema} from "@noovies-tickets/common";

/** Schema for showing language configuration with normalization for form input. */
export const ShowingFormLanguageSchema = z.object({
    language: preprocessEmptyToUndefined(ISO6391LanguageCodeSchema),
    subtitleLanguages: generateArraySchema(ISO6391LanguageCodeSchema).nonempty({message: "Required."}),
});

/** Inferred type for showing language form values. */
export type ShowingFormLanguages = z.infer<typeof ShowingFormLanguageSchema>;