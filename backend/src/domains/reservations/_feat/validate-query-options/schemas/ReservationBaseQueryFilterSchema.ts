/**
 * @fileoverview Zod schema for validating base reservation query filters.
 */

import {z} from "zod";
import {ReservationStatusSchema, ReservationTypeSchema} from "@noovies-tickets/common";
import {URLParamRegexPatternSchema} from "@/shared/_feat/parse-query-string";
import {ObjectIdSchema} from "@/shared/_schema/mongoose/ObjectIdSchema";

/** Zod schema for validating the base query parameters of a reservation. */
export const ReservationBaseQueryFilterSchema = z.object({
    movie: ObjectIdSchema.optional(),
    user: ObjectIdSchema.optional(),
    showing: ObjectIdSchema.optional(),
    uniqueCode: URLParamRegexPatternSchema,
    status: ReservationStatusSchema.optional(),
    reservationType: ReservationTypeSchema.optional(),
});

/** Type definition for the base reservation query filters inferred from the Zod schema. */
export type ReservationBaseQueryFilters = z.infer<typeof ReservationBaseQueryFilterSchema>;
