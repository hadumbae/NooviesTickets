/**
 * @fileoverview Zod schema for validating queries that fetch showings filtered by screen and date.
 */

import {z} from "zod";
import {ObjectIdSchema} from "@/shared/_schema/mongoose/ObjectIdSchema";
import {NonNegativeNumberSchema, DateOnlyStringSchema, SlugStringSchema} from "@noovies-tickets/common";

/** Schema for the showings by screen query parameters. */
export const ShowingsByTheatreScreenQuerySchema = z.object({
    theatreID: z.union([ObjectIdSchema, SlugStringSchema], {message: "Must be an ID string or a valid slug."}),
    dateString: DateOnlyStringSchema,
    limit: NonNegativeNumberSchema.optional(),
});

/** Type definition for the showings by screen query parameters. */
export type ShowingsByTheatreScreenQuery = z.infer<typeof ShowingsByTheatreScreenQuerySchema>;
