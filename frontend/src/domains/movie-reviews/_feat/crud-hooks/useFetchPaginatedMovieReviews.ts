/**
 * @fileoverview React Query hook for fetching paginated MovieReview collections.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts";
import {PaginatedQueryConfig} from "@/common/_types";
import {MovieReviewCRUDQueryKeys} from "@/domains/movie-reviews/_feat/crud-hooks/queryKeys.ts";
import {paginated} from "@/domains/movie-reviews/_feat/crud/repository/repository.ts";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";

/**
 * Fetches a paginated collection of MovieReviews using React Query.
 */
export function useFetchPaginatedMovieReviews<TData = unknown>(
    {schema, page, perPage, queries, config, options}: PaginatedQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchReviews = buildQueryFn<TData>({
        action: () => paginated({pagination: {page, perPage}, queries, config}),
        schema,
    });

    return useQuery({
        queryKey: MovieReviewCRUDQueryKeys.paginated({page, perPage, ...queries, ...config}),
        queryFn: fetchReviews,
        ...useQueryOptionDefaults(options),
    });
}
