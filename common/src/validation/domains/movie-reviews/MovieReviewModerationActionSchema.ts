/**
 * @fileoverview Zod validation schema for movie review moderation actions.
 */

import {z} from "zod";
import {MovieReviewModerationActionConstant} from "./MovieReviewModerationActionConstant";
import {ZodEnumParamHandler} from "../../schema/enums/handler/ZodEnumParamHandler";

/** Schema for validating administrative moderation commands. */
export const MovieReviewModerationActionSchema = z.enum(
    MovieReviewModerationActionConstant,
    ZodEnumParamHandler({
        invalidValue: "Invalid Value.",
        invalidType: "Must be a valid string.",
    }),
);

/** TypeScript type inferred from the MovieReviewModerationActionSchema. */
export type MovieReviewModerationAction = z.infer<typeof MovieReviewModerationActionSchema>;
