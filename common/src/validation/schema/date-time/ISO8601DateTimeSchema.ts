/**
 * @fileoverview Zod schema for validating and transforming ISO-8601 strings into Luxon DateTime objects.
 */

import {z} from "zod";
import {DateTime} from "luxon";
import {ISO8601StringSchema} from "./ISO8601StringSchema";

/** Zod schema that transforms an ISO-8601 string into a validated Luxon DateTime instance in UTC. */
export const ISO8601DateTimeSchema = ISO8601StringSchema
    .transform((dateString) => DateTime.fromISO(dateString, {zone: "UTC"}) as DateTime<true>);

/** Type representing a validated Luxon DateTime instance. */
export type ISO8601DateTime = z.infer<typeof ISO8601DateTimeSchema>;