/**
 * @fileoverview Defines the schema and types for the genre query form.
 */

import {AnyValues} from "@/shared/_types";
import {GenreQueryOptions} from "@noovies-tickets/common";

/** Type representing the initial values for the genre query option form. */
export type GenreQueryOptionsFormStarter = AnyValues<GenreQueryOptions>;