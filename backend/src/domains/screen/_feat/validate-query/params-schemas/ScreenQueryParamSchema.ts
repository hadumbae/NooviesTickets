/**
 * @fileoverview Validation schema for domain-specific query parameters in the Screen domain.
 */

import {z} from "zod";
import {NonNegativeNumberSchema, preprocessToNumber} from "@noovies-tickets/common";

/**
 * Zod schema for auxiliary Screen query parameters.
 */
export const ScreenQueryParamSchema = z.object({
    showingsPerScreen: preprocessToNumber(NonNegativeNumberSchema.optional()).optional(),
});

/**
 * TypeScript type inferred from ScreenQueryParamSchema.
 */
export type ScreenQueryParams = z.infer<typeof ScreenQueryParamSchema>;
