/**
 * @fileoverview Zod schema and type definitions for virtual theatre screen properties.
 */

import {z} from "zod";

import {NonNegativeNumberSchema} from "@noovies-tickets/common";

/**
 * Schema for calculated or derived theatre screen data.
 */
export const TheatreScreenVirtualsSchema = z.object({
    seatCount: NonNegativeNumberSchema,
    futureShowingCount: NonNegativeNumberSchema,
});

/** Virtual properties for the TheatreScreen component. */
export type TheatreScreenVirtuals = z.infer<typeof TheatreScreenVirtualsSchema>;