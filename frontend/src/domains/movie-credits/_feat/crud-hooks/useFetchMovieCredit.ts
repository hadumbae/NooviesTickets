/** @fileoverview Hook for fetching a single movie credit by its unique identifier. */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/shared/_err/HttpResponseError.ts";
import {ObjectIdString} from "@noovies-tickets/common";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import {QueryConfig} from "@/shared/_types";
import {MovieCreditCRUDQueryKeys} from "@/domains/movie-credits/_feat/crud-hooks/queryKeys.ts";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {findByID} from "@/domains/movie-credits/_feat/crud/repository.ts";

/** Configuration for fetching a movie credit including the identifier and validation schema. */
type FetchParams<TData = unknown> = QueryConfig<TData> & {
    _id: ObjectIdString;
};

/** Fetches a movie credit record and validates it against the provided schema. */
export function useFetchMovieCredit<TData = unknown>(
    {schema, _id, config, options}: FetchParams<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchMovieCredit = buildQueryFn<TData>({
        action: () => findByID({_id, config}),
        schema,
    });

    return useQuery({
        queryKey: MovieCreditCRUDQueryKeys._id({_id, ...config}),
        queryFn: fetchMovieCredit,
        ...useQueryOptionsDefaults(options),
    });
}