/**
 * @fileoverview React Query hook for fetching and validating a person's filmography.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {HttpResponseError, ObjectIdString} from "@noovies-tickets/common";
import {FetchQueryOptions} from "@/shared/_types/fetch-queries/FetchQueryOptions.ts";
import {RequestOptions} from "@/shared/_types/request/RequestOptions.ts";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import {getFetchFilmographyForPerson} from "@/domains/movie-credits/_feat/person-credit/repository";
import {PersonFilmography, PersonFilmographySchema} from "@/domains/movie-credits/_feat/person-credit/schema";
import {PersonCreditQueryKeys} from "@/domains/movie-credits/_feat/person-credit/fetch/PersonCreditQueryKeys.ts";

/** Parameters for the useFetchFilmographyForPerson hook. */
type FetchParams = {
    _id: ObjectIdString;
    config?: RequestOptions;
    options?: FetchQueryOptions<PersonFilmography>;
};

/**
 * Fetches and validates a person's grouped filmography.
 */
export function useFetchFilmographyForPerson(
    {_id, options, config}: FetchParams
): UseQueryResult<PersonFilmography, HttpResponseError> {
    /** Wraps the repository call with Zod schema validation. */
    const fetchCredits = buildQueryFn<PersonFilmography>({
        action: () => getFetchFilmographyForPerson({_id, config}),
        schema: PersonFilmographySchema,
    });

    return useQuery({
        queryKey: PersonCreditQueryKeys.filmography({_id, ...config}),
        queryFn: fetchCredits,
        ...useQueryOptionsDefaults(options),
    });
}