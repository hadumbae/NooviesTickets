/**
 * @fileoverview Validation schemas and type definitions for person index query options.
 */

import {z} from "zod";
import {PersonQueryOptionsSchema} from "@/domains/persons/_schema/query-options";
import {AnyValues} from "@/shared/_types";

/** Zod schema validating query parameters for filtering and sorting persons in an index list. */
export const PersonIndexQueryOptionsSchema = PersonQueryOptionsSchema.pick({
    name: true,
    nationality: true,
    sortByName: true,
    sortByNationality: true,
});

/** Type definition for query options inferred from PersonIndexQueryOptionsSchema. */
export type PersonIndexQueryOptions = z.infer<typeof PersonIndexQueryOptionsSchema>;

/** Type representing loose or unparsed form field values corresponding to PersonIndexQueryOptions. */
export type PersonIndexQueryOptionsFormValues = AnyValues<PersonIndexQueryOptions>;