/**
 * @fileoverview Repository for fetching paginated moderation logs for a specific customer review.
 */

import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns.ts"
import {handleFetchOperation} from "@/common/_feat/use-fetch-api/handleFetchOperation.ts"
import {CustomerReviewLogsViewData} from "@/domains/customers/_feat/movie-review-logs/schema/viewDataSchema.ts";
import {buildURL} from "@/common/_feat/fetch-api";
import {
    GetFetchCustomerReviewLogsViewDataConfig
} from "@/domains/customers/_feat/movie-review-logs/repository/repository.types";
import {CustomerReviewLogsBaseURL} from "@/domains/customers/_feat/movie-review-logs/repository/baseURL.ts";

/** Retrieves paginated moderation audit logs for a specific review from the administrative API. */
export async function getFetchCustomerReviewLogsViewData(
    {customerID, reviewID, pagination}: GetFetchCustomerReviewLogsViewDataConfig
): Promise<FetchRequestReturns<CustomerReviewLogsViewData>> {
    const url = buildURL({
        baseURL: CustomerReviewLogsBaseURL,
        path: `/customer/${customerID}/review/${reviewID}/logs`,
        queries: pagination
    })

    return handleFetchOperation({method: "GET", url})
}