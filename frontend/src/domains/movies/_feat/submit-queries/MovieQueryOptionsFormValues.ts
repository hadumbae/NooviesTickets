/**
 * @fileoverview Defines the form value types for movie query options.
 */

import {AnyValues} from "@/shared/_types/form/AnyValues";
import {MovieQueryOptions} from "@noovies-tickets/common";

/** Form values derived from movie query options. */
export type MovieQueryOptionsFormValues = AnyValues<MovieQueryOptions>;