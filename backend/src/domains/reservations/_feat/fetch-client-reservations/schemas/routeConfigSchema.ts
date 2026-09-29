/**
 * @fileoverview Defines the schema for the current user's paginated reservations route configuration.
 */

import {z} from "zod";
import {QueryPaginationParamsSchema} from "@/shared/_schema";

/** Zod schema for validating pagination parameters for the current user's reservation list. */
export const ClientReservationsRouteConfigSchema = QueryPaginationParamsSchema;

/** Type definition for the client reservations route configuration. */
export type ClientReservationsRouteConfig = z.infer<typeof ClientReservationsRouteConfigSchema>;
