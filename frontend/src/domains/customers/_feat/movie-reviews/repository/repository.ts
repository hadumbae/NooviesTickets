/**
 * @fileoverview Repository for fetching paginated movie reviews authored by a specific customer.
 */

import {FetchRequestReturns} from "@/shared/_types/request/FetchRequestReturns.ts"
import {CustomerReviewsViewData} from "@/domains/customers/_feat/movie-reviews/schema/viewDataSchema.ts"
import {handleFetchOperation} from "@/shared/_feat/use-fetch-api/handleFetchOperation.ts"
import {buildURL} from "@/shared/_feat/fetch-api";
import {ManageCustomerMovieReviewsBaseURL} from "@/domains/customers/_feat/movie-reviews/repository/baseURL.ts";
import {
    GetFetchCustomerReviewsViewDataConfig
} from "@/domains/customers/_feat/movie-reviews/repository/repository.types";

/**
 * Fetches a paginated collection of reviews authored by a specific customer.
 */
export function getFetchCustomerReviewsViewData(
    {customerID, pagination}: GetFetchCustomerReviewsViewDataConfig
): Promise<FetchRequestReturns<CustomerReviewsViewData>> {
    const url = buildURL({
        baseURL: ManageCustomerMovieReviewsBaseURL,
        path: `/customer/${customerID}/reviews`,
        queries: pagination
    });

    return handleFetchOperation<CustomerReviewsViewData>({method: "GET", url})
}