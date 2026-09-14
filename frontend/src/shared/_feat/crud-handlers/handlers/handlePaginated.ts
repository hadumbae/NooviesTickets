/**
 * @fileoverview Higher-order function for generating standardized paginated request handlers.
 * Facilitates faceted search and pagination by merging limit, offset, and filter parameters.
 */

import {FetchRequestReturns} from "@/shared/_types/request/FetchRequestReturns.ts";
import {handleFetchOperation} from "@/shared/_feat/use-fetch-api/handleFetchOperation.ts";
import {RequestOptions} from "@/shared/_types/request/RequestOptions.ts";
import {PaginationOptions} from "@noovies-tickets/common";
import {buildURL} from "@/shared/_feat/fetch-api";

/**
 * Composite parameters for requesting paginated document sets.
 */
export type FindPaginatedDocumentsConfig<TQueries extends Record<string, unknown>> = {
    pagination: PaginationOptions;
    queries?: TQueries;
    config?: RequestOptions;
};

/**
 * Generates an asynchronous fetcher for paginated resource retrieval using the GET method.
 */
export const handlePaginated = (baseURL: string) => {
    return async <TQueries extends Record<string, unknown>, TReturns = unknown>(
        {queries, config, pagination}: FindPaginatedDocumentsConfig<TQueries>
    ): Promise<FetchRequestReturns<TReturns>> => {
        const url = buildURL({
            baseURL,
            path: "/paginated",
            queries: {
                ...pagination,
                ...queries,
                ...config,
            },
        });

        return handleFetchOperation({url, method: "GET"});
    };
};