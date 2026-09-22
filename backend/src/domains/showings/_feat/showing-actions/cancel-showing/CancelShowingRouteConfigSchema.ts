/**
 * @fileoverview Zod schema and type definitions for validating route parameters when cancelling a movie showing.
 */

import {z} from "zod";
import {ObjectIdSchema} from "@/shared/_schema/mongoose/ObjectIdSchema";

/** Schema for validating route parameters when performing a movie showing cancellation. */
export const CancelShowingRouteConfigSchema = z.object({
    _id: ObjectIdSchema,
});

/** Type representing validated route parameters for cancelling a movie showing. */
export type CancelShowingRouteConfig = z.infer<typeof CancelShowingRouteConfigSchema>;