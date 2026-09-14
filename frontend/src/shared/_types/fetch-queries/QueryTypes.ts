/**
 * @fileoverview Configuration types for data fetching operations involving pagination, validation, and filtering.
 */

import {PaginationOptions} from "@noovies-tickets/common";
import {ZodType, ZodTypeDef} from "zod";
import {RequestOptions} from "@/shared/_types/request/RequestOptions.ts";
import {FetchQueryOptions} from "@/shared/_types/fetch-queries/FetchQueryOptions.ts";
import {ObjectIdString, SlugString} from "@noovies-tickets/common";

/** Base configuration for individual data queries requiring schema validation. */
export type QueryConfig<TData = unknown> = {
    schema: ZodType<TData, ZodTypeDef, unknown>
    config?: RequestOptions;
    options?: FetchQueryOptions<TData>;
};

/** Configuration for fetching a single entity by its unique identifier. */
export type IDQueryConfig<TData = unknown> = QueryConfig<TData> & {
    _id: ObjectIdString;
};

/** Configuration for fetching a single entity by its URL-friendly slug. */
export type SlugQueryConfig<TData = unknown> = QueryConfig<TData> & {
    slug: SlugString;
};

/** Configuration for fetching collections with optional filters. */
export type ListQueryConfig<
    TData = unknown,
    TQueries extends Record<string, unknown> = Record<string, unknown>
> = QueryConfig<TData> & {
    queries?: TQueries;
};

/** Configuration for standardized paginated API requests. */
export type PaginatedQueryConfig<
    TData = unknown,
    TQueries extends Record<string, unknown> = Record<string, unknown>
> = PaginationOptions & ListQueryConfig<TData, TQueries>;