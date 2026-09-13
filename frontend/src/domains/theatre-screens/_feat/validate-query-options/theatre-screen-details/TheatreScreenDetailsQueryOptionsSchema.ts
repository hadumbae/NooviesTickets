/**
 * @fileoverview Defines the validation schema and type for theatre screen details query options.
 */

import {z} from "zod";
import {NonNegativeNumberSchema, preprocessToNumber} from "@noovies-tickets/common";

/** Zod schema for validating query options when fetching theatre screen details. */
export const TheatreScreenDetailsQueryOptionsSchema = z.object({
    recentShowingsCount: preprocessToNumber(
        NonNegativeNumberSchema.max(20, "Max 20 recent showings.").optional()
    ).optional().catch(10),
});

/** Inferred TypeScript type for theatre screen details query options. */
export type TheatreScreenDetailsQueryOptions = z.infer<typeof TheatreScreenDetailsQueryOptionsSchema>;