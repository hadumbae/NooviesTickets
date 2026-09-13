/**
 * @fileoverview Zod schema and type definitions for cast member credit forms.
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "@noovies-tickets/common";
import {URLParamBooleanSchema} from "@/common/_schemas/boolean";
import {MovieCreditFormBaseSchema} from "@/domains/movie-credits/_feat/submit-data/schemas/MovieCreditFormBaseSchema.ts";
import {PositiveNumberSchema} from "@noovies-tickets/common";

/** Zod schema for a complete cast credit including base fields. */
export const MovieCreditFormCastSchema = MovieCreditFormBaseSchema.extend({
    department: z.literal("CAST", {required_error: "Required.", message: "Must be `CAST`."}),
    characterName: NonEmptyStringSchema.max(150, {message: "Must be 150 characters or less."}),
    billingOrder: z.preprocess(
        (val) => {
            if (typeof val !== "number" && !(typeof val === "string" && val !== "")) return undefined;
            const num = Number(val);
            return !isNaN(num) ? num : undefined;
        },
        PositiveNumberSchema.optional(),
    ),
    isPrimary: URLParamBooleanSchema,
    uncredited: URLParamBooleanSchema,
    voiceOnly: URLParamBooleanSchema,
    cameo: URLParamBooleanSchema,
    motionCapture: URLParamBooleanSchema,
    archiveFootage: URLParamBooleanSchema,
});

/** Type representing a full cast credit form inferred from MovieCreditFormCastSchema. */
export type MovieCreditFormCastValues = z.infer<typeof MovieCreditFormCastSchema>;