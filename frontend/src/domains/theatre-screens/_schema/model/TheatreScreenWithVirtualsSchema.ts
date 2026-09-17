/**
 * @fileoverview Zod schema and type definitions for a theatre screen combined with its virtual properties.
 */

import {z} from "zod";
import {TheatreScreenSchema} from "@noovies-tickets/common";
import {TheatreScreenVirtualsSchema} from "@/domains/theatre-screens/_schema/model/TheatreScreenVirtualsSchema.ts";

/**
 * Merged schema of the base theatre screen and its calculated virtual fields.
 */
export const TheatreScreenWithVirtualsSchema = TheatreScreenSchema.merge(TheatreScreenVirtualsSchema);

/** Theatre screen entity including calculated virtual properties. */
export type TheatreScreenWithVirtuals = z.infer<typeof TheatreScreenWithVirtualsSchema>;