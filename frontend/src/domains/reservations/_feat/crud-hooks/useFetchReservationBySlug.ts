/**
 * @fileoverview React Query hook for fetching a single reservation by its slug.
 */

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import HttpResponseError from "@/shared/_err/HttpResponseError.ts";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import {SlugQueryConfig} from "@/shared/_types";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {ReservationCRUDQueryKeys} from "@/domains/reservations/_feat/crud-hooks/queryKeys.ts";
import {findBySlug} from "@/domains/reservations/_feat/crud";

/**
 * Fetches a reservation by slug and validates the response against a schema.
 */
export function useFetchReservationBySlug<TData = unknown>(
    { slug, options, config, schema }: SlugQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchReservation = buildQueryFn<TData>({
        action: () => findBySlug({ slug, config }),
        schema
    });

    return useQuery({
        queryKey: ReservationCRUDQueryKeys.slug({ slug, ...config }),
        queryFn: fetchReservation,
        ...useQueryOptionsDefaults(options),
    });
}
