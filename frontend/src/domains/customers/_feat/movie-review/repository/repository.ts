/**
 * @fileoverview Repository for fetching granular movie review and author identity data.
 */

import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns.ts"
import {CustomerReviewViewData} from "@/domains/customers/_feat/movie-review/schema/viewDataSchema.ts"
import {handleFetchOperation} from "@/common/_feat/use-fetch-api/handleFetchOperation.ts"
import {buildURL} from "@/common/_feat/fetch-api";
import {ManageCustomerMovieReviewBaseURL} from "@/domains/customers/_feat/movie-review/repository/baseURL.ts";
import {GetFetchCustomerReviewViewDataConfig} from "@/domains/customers/_feat/movie-review/repository/repository.types";

/**
 * Fetches detailed review and author data for a specific movie review.
 */
export function getFetchCustomerReviewViewData(
    {customerID, reviewID}: GetFetchCustomerReviewViewDataConfig
): Promise<FetchRequestReturns<CustomerReviewViewData>> {
    const url = buildURL({
        baseURL: ManageCustomerMovieReviewBaseURL,
        path: `/customer/${customerID}/review/${reviewID}`,
    });

    return handleFetchOperation<CustomerReviewViewData>({method: "GET", url});
}