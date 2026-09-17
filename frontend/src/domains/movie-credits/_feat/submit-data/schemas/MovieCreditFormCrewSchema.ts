/** @fileoverview Zod schema and type definitions for crew credit form submissions. */

import {
    MovieCreditFormBaseSchema
} from "@/domains/movie-credits/_feat/submit-data/schemas/MovieCreditFormBaseSchema.ts";
import {z} from "zod";
import {preprocessToUndefined, UndefinedValueSchema} from "@noovies-tickets/common";

/** Zod schema for crew credit submissions that explicitly disallows cast-specific fields. */
export const MovieCreditFormCrewSchema = MovieCreditFormBaseSchema.extend({
    department: z.literal("CREW", {required_error: "Required.", message: "Must be `CREW`."}),
    billingOrder: preprocessToUndefined(UndefinedValueSchema),
    characterName: preprocessToUndefined(UndefinedValueSchema),
    isPrimary: preprocessToUndefined(UndefinedValueSchema),
    uncredited: preprocessToUndefined(UndefinedValueSchema),
    voiceOnly: preprocessToUndefined(UndefinedValueSchema),
    cameo: preprocessToUndefined(UndefinedValueSchema),
    motionCapture: preprocessToUndefined(UndefinedValueSchema),
    archiveFootage: preprocessToUndefined(UndefinedValueSchema),
});

/** Form values for a crew credit submission inferred from MovieCreditFormCrewSchema. */
export type MovieCreditFormCrewValues = z.infer<typeof MovieCreditFormCrewSchema>;