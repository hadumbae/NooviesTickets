/**
 * @fileoverview TanStack Query hook for fetching administrative customer reservation detail views.
 *
 */

import {HttpResponseError, ObjectIdString} from "@noovies-tickets/common";
import {FetchQueryOptions} from "@/shared/_types/fetch-queries/FetchQueryOptions.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {CustomerReservationViewQueryKeys} from "@/domains/customers/_feat/manage-reservation/fetch/queryKeys.ts";
import {getFetchCustomerReservationViewData} from "@/domains/customers/_feat/manage-reservation/repository";
import {
    CustomerReservationViewData,
    CustomerReservationViewSchema
} from "@/domains/customers/_feat/manage-reservation/schema";

/** Parameters for the customer reservation data fetch hook. */
export type FetchParams = {
    customerID: ObjectIdString;
    reservationID: ObjectIdString;
    options?: FetchQueryOptions<CustomerReservationViewData>;
};

/** Fetches and validates hydrated reservation and author data for administrative moderation. */
export function useFetchCustomerReservationViewData(
    {customerID, reservationID, options}: FetchParams
): UseQueryResult<CustomerReservationViewData, HttpResponseError> {
    const fetchDetails = buildQueryFn({
        action: () => getFetchCustomerReservationViewData({customerID, reservationID}),
        schema: CustomerReservationViewSchema,
    });

    return useQuery({
        queryKey: CustomerReservationViewQueryKeys.reservation({customerID, reservationID}),
        queryFn: fetchDetails,
        ...useQueryOptionsDefaults(options),
    });
}