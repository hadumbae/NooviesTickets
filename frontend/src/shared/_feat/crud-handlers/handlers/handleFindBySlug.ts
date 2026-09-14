/**
 * @fileoverview Higher-order function for generating standardized "Find By Slug" request handlers.
 * Facilitates document retrieval using a human-readable slug identifier.
 */

import {FetchRequestReturns} from "@/shared/_types/request/FetchRequestReturns.ts";
import {handleFetchOperation} from "@/shared/_feat/use-fetch-api/handleFetchOperation.ts";
import {RequestOptions} from "@/shared/_types/request/RequestOptions.ts";
import {buildURL} from "@/shared/_feat/fetch-api";

/**
 * Parameters for fetching a document by its slug.
 */
export type FindDocumentBySlugConfig = {
    slug: string;
    config?: Omit<RequestOptions, "limit">;
};

/**
 * Generates an asynchronous fetcher for slug-based lookups using the GET method.
 */
export function handleFindBySlug(baseURL: string) {
    return async <TReturns = unknown>(
        {slug, config}: FindDocumentBySlugConfig
    ): Promise<FetchRequestReturns<TReturns>> => {
        const url = buildURL({
            baseURL,
            path: `/item/${slug}/slug`,
            queries: config,
        });

        return handleFetchOperation({url, method: "GET"});
    };
}