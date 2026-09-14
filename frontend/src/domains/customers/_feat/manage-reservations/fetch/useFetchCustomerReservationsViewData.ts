/**
 * @fileoverview React Query hook for retrieving paginated movie reservations for a specific customer.
 */
import {FetchQueryOptions} from "@/shared/_types/fetch-queries/FetchQueryOptions.ts";
import {PaginationOptions} from "@noovies-tickets/common";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/shared/_err/HttpResponseError.ts";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {useQueryOptionDefaults} from "@/shared/_feat/handle-query/useQueryOptionDefaults.ts";
import {
    getFetchCustomerReservationsViewData
} from "@/domains/customers/_feat/manage-reservations/repository/repository.ts";
import {CustomerReservationsViewQueryKeys} from "@/domains/customers/_feat/manage-reservations/fetch/queryKeys.ts";
import {ObjectIdString} from "@noovies-tickets/common";
import {
    CustomerReservationsViewData,
    CustomerReservationsViewDataSchema
} from "@/domains/customers/_feat/manage-reservations/schema/viewDataSchema.ts";

/** Parameters for the useFetchCustomerReservationsViewData hook. */
export type FetchParams = {
    customerID: ObjectIdString;
    pagination: PaginationOptions;
    options?: FetchQueryOptions<CustomerReservationsViewData>;
};

/** Manages the server-state and validation for a customer's paginated review history. */
export function useFetchCustomerReservationsViewData(
    {customerID, pagination, options}: FetchParams
): UseQueryResult<CustomerReservationsViewData, HttpResponseError> {
    const fetchDetails = buildQueryFn({
        schema: CustomerReservationsViewDataSchema,
        action: () => getFetchCustomerReservationsViewData({customerID, pagination})
    });

    return useQuery({
        queryKey: CustomerReservationsViewQueryKeys.reservations({customerID, ...pagination}),
        queryFn: fetchDetails,
        ...useQueryOptionDefaults(options),
    });
}