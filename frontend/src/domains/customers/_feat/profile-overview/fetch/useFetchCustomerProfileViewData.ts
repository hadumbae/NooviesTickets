/**
 * @fileoverview Custom React hook for fetching aggregated customer profile data using TanStack Query.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {FetchQueryOptions} from "@/shared/_types/fetch-queries/FetchQueryOptions.ts";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import {getFetchCustomerProfileViewData} from "@/domains/customers/_feat/profile-overview/repository/repository.ts";
import {CustomerProfileOverviewViewQueryKeys} from "@/domains/customers/_feat/profile-overview/fetch/queryKeys.ts";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {CustomerProfileViewData, CustomerProfileViewDataSchema} from "@/domains/customers/_feat/profile-overview/schema/viewDataSchema.ts";
import {HttpResponseError, ObjectIdString} from "@noovies-tickets/common";

/** Parameters for the customer profile fetch hook. */
export type FetchParams = {
    customerID: ObjectIdString;
    options?: FetchQueryOptions<CustomerProfileViewData>;
}

/** Hook to manage the server state and caching of a customer's profile overview. */
export function useFetchCustomerProfileViewData(
    {customerID, options}: FetchParams
): UseQueryResult<CustomerProfileViewData, HttpResponseError> {
    const fetchDetails = buildQueryFn<CustomerProfileViewData>({
        action: () => getFetchCustomerProfileViewData({customerID}),
        schema: CustomerProfileViewDataSchema,
    });

    return useQuery({
        queryKey: CustomerProfileOverviewViewQueryKeys.profile({customerID}),
        queryFn: fetchDetails,
        ...useQueryOptionsDefaults(options),
    });
}