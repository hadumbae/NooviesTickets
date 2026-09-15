/**
 * @fileoverview React Query hooks for fetching MovieReview collections.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/shared/_err/HttpResponseError.ts";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import {ListQueryConfig} from "@/shared/_types";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {MovieReviewCRUDQueryKeys} from "@/domains/movie-reviews/_feat/crud-hooks/queryKeys.ts";
import {find} from "@/domains/movie-reviews/_feat/crud/repository/repository.ts";

/**
 * Fetches a collection of movie reviews and validates them against a schema.
 */
export function useFetchMovieReviews<TData = unknown>(
    {schema, queries, config, options}: ListQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchReviews = buildQueryFn<TData>({
        action: () => find({queries, config}),
        schema,
    });

    return useQuery({
        queryKey: MovieReviewCRUDQueryKeys.find({...queries, ...config}),
        queryFn: fetchReviews,
        ...useQueryOptionsDefaults(options),
    });
}
