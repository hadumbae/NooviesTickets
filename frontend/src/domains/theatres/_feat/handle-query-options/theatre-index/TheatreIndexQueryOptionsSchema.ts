/**
 * @fileoverview Defines the validation schema and types for theatre index query options.
 */

import {TheatreQueryOptionsSchema} from "@/domains/theatres/_feat/handle-query-options/options/TheatreQueryOptionsSchema.ts";
import {z} from "zod";
import {AnyValues} from "@/shared/_types";

/** Zod schema for validating query options when listing theatres in the index view. */
export const TheatreIndexQueryOptionsSchema = TheatreQueryOptionsSchema.pick({
    name: true,
    country: true,
    postalCode: true,
    sortByName: true,
    sortByCountry: true,
    sortByPostalCode: true,
});

/** Inferred TypeScript type for theatre index query options. */
export type TheatreIndexQueryOptions = z.infer<typeof TheatreIndexQueryOptionsSchema>;

/** Form values type for theatre index query options. */
export type TheatreIndexQueryOptionsFormValues = AnyValues<TheatreIndexQueryOptions>;