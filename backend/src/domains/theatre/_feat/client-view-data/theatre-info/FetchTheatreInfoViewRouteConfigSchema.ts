/**
 * @fileoverview Zod schema for validating theatre info view route parameters.
 */

import {z} from "zod";
import {preprocessToNumber, NonNegativeNumberSchema, DateOnlyStringSchema, SlugStringSchema} from "@noovies-tickets/common";

/** Zod schema for validating theatre info view route parameters. */
export const FetchTheatreInfoViewRouteConfigSchema = z.object({
    theatreSlug: SlugStringSchema,
    localDateString: DateOnlyStringSchema,
    limit: preprocessToNumber(NonNegativeNumberSchema.max(10).optional()).optional().default(3).catch(3),
});

/** Type definition for the theatre info view route parameters. */
export type FetchTheatreInfoViewRouteConfig = z.infer<typeof FetchTheatreInfoViewRouteConfigSchema>;