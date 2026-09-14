/**
 * @fileoverview Zod validation schema for moderation forms requiring a justification message.
 */

import {z} from "zod";
import {preprocessEmptyToUndefined} from "@noovies-tickets/common";
import {NonEmptyStringSchema} from "@noovies-tickets/common";
import {AnyValues} from "@/shared/_types";

/** Validates the justification message provided in administrative moderation forms. */
export const ModerationMessageFormSchema = z.object({
    /** The mandatory explanation for the administrative action being taken. */
    message: preprocessEmptyToUndefined(
        NonEmptyStringSchema.max(500, "Must be no more than 500 characters.")
    ),
});

/** TypeScript type inferred from ModerationMessageFormSchema. */
export type ModerationMessageFormData = z.infer<typeof ModerationMessageFormSchema>;

/** Type representing raw input values for the moderation message form. */
export type ModerationMessageFormValues = AnyValues<ModerationMessageFormData>;