/**
 * @fileoverview React Query hook for retrieving paginated movie reviews for a specific customer.
 */
import {FetchQueryOptions} from "@/shared/_types/fetch-queries/FetchQueryOptions.ts";
import {PaginationOptions} from "@noovies-tickets/common";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/shared/_err/HttpResponseError.ts";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import {getFetchCustomerReviewsViewData} from "@/domains/customers/_feat/movie-reviews/repository/repository.ts";
import {CustomerReviewsViewQueryKeys} from "@/domains/customers/_feat/movie-reviews/fetch/queryKeys.ts";
import {ObjectIdString} from "@noovies-tickets/common";
import {
    CustomerReviewsViewData,
    CustomerReviewsViewDataSchema
} from "@/domains/customers/_feat/movie-reviews/schema/viewDataSchema.ts";

/** Parameters for the useFetchCustomerReviewsViewData hook. */
export type FetchParams = {
    customerID: ObjectIdString;
    pagination: PaginationOptions;
    options?: FetchQueryOptions<CustomerReviewsViewData>;
};

/** Manages the server-state and validation for a customer's paginated review history. */
export function useFetchCustomerReviewsViewData(
    {customerID, pagination, options}: FetchParams
): UseQueryResult<CustomerReviewsViewData, HttpResponseError> {
    const fetchDetails = buildQueryFn({
        schema: CustomerReviewsViewDataSchema,
        action: () => getFetchCustomerReviewsViewData({customerID, pagination})
    });

    return useQuery({
        queryKey: CustomerReviewsViewQueryKeys.reviews({customerID, ...pagination}),
        queryFn: fetchDetails,
        ...useQueryOptionsDefaults(options),
    });
}