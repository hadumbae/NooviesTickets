/**
 * @fileoverview Core showing schema and type definition.
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "@noovies-tickets/common";
import {IDStringSchema, IANATimezoneSchema, ISO6391LanguageCodeSchema, ShowingStatusSchema} from "@noovies-tickets/common";
import {ShowingConfigSchema} from "@/domains/showings/_schema/showing/ShowingConfigSchema.ts";
import {ShowingTimeSchema, TicketPriceSchema} from "@/domains/showings/_schema/fields";
import {TheatreSnapshotSchema} from "@/domains/theatres/_schema/snapshot/TheatreSnapshotSchema.ts";

/**
 * Core showing schema.
 */
export const ShowingSchema = z.object({
    _id: IDStringSchema.readonly(),
    startTime: ShowingTimeSchema,
    endTime: ShowingTimeSchema.optional().nullable(),
    timezone: IANATimezoneSchema,
    ticketPrice: TicketPriceSchema,
    language: ISO6391LanguageCodeSchema,
    subtitleLanguages: z.array(ISO6391LanguageCodeSchema).nonempty({message: "Must not be empty."}),
    movie: IDStringSchema,
    theatre: IDStringSchema,
    screen: IDStringSchema,
    status: ShowingStatusSchema,
    theatreSnapshot: TheatreSnapshotSchema,
    config: ShowingConfigSchema,
    slug: NonEmptyStringSchema,
});

/**
 * Inferred showing type.
 */
export type Showing = z.infer<typeof ShowingSchema>;