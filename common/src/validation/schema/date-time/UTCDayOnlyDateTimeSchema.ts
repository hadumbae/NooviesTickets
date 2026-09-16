/**
 * @fileoverview Zod schema for validating and transforming ISO 8601 strings into UTC day-only Luxon DateTime objects.
 */

import {z} from "zod";
import {DateTime} from "luxon";
import {ISO8601StringSchema} from "./ISO8601StringSchema";

/** Zod schema that transforms an ISO 8601 string into a Luxon DateTime object at the start of the day in UTC. */
export const UTCDayOnlyDateTimeSchema = ISO8601StringSchema
    .transform((dateString) => DateTime.fromISO(dateString, {zone: "utc"}).startOf("day"));

/** Type inferred from the UTCDayOnlyDateTimeSchema. */
export type UTCDayOnlyDateTime = z.infer<typeof UTCDayOnlyDateTimeSchema>;
