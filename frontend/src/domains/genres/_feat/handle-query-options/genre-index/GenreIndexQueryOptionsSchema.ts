/**
 * @fileoverview Zod schema and type definitions for filtering and sorting genres on the index page.
 */

import {GenreQueryOptionsSchema} from "@/domains/genres/_schema/filters/GenreQueryOptionsSchema.ts";
import {z} from "zod";
import {AnyValues} from "@/shared/_types";

/** Schema for validating genre index query search options. */
export const GenreIndexQueryOptionsSchema = GenreQueryOptionsSchema.pick({
    name: true,
    sortByName: true,
});

/** Inferred TypeScript data type for genre index query options. */
export type GenreIndexQueryOptions = z.infer<typeof GenreIndexQueryOptionsSchema>;

/** Permissive value type for genre index query option form state. */
export type GenreIndexQueryOptionsFormValues = AnyValues<GenreIndexQueryOptions>;