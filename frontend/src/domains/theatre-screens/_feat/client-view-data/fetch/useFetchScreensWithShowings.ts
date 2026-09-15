/**
 * @fileoverview React Query hook for fetching screens with scheduled showings.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {generateArraySchema} from "@noovies-tickets/common";
import {SlugString, ObjectIdString, DateOnlyString} from "@noovies-tickets/common";
import HttpResponseError from "@/shared/_err/HttpResponseError.ts";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import {FetchQueryOptions} from "@/shared/_types/fetch-queries/FetchQueryOptions.ts";

import {TheatreScreenSchedule, TheatreScreenScheduleSchema} from "@/domains/theatre-screens/_schema";
import {fetchScreensWithShowings} from "@/domains/theatre-screens/_feat/client-view-data/repository";
import {TheatreScreenClientViewQueryKeys} from "@/domains/theatre-screens/_feat/client-view-data/fetch/queryKeys.ts";

type FetchParams = {
    theatreID: ObjectIdString | SlugString;
    dateString: DateOnlyString;
    options?: FetchQueryOptions<TheatreScreenSchedule[]>;
};

/**
 * React Query hook for fetching screens with their scheduled showings for a given theatre and date.
 */
export function useFetchScreensWithShowings(
    {theatreID, dateString, options}: FetchParams
): UseQueryResult<TheatreScreenSchedule[], HttpResponseError> {
    const fetchScreens = buildQueryFn<TheatreScreenSchedule[]>({
        action: () => fetchScreensWithShowings({theatreID, localDate: dateString}),
        schema: generateArraySchema(TheatreScreenScheduleSchema),
    });

    return useQuery({
        queryKey: TheatreScreenClientViewQueryKeys.withShowings({theatreID, dateString}),
        queryFn: fetchScreens,
        ...useQueryOptionsDefaults(options),
    });
}