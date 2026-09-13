/**
 * @fileoverview Higher-order function for generating standardized "Create" request handlers.
 * Facilitates the creation of new resources via POST requests to a central "item" endpoint.
 */

import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns.ts";
import {handleFetchOperation} from "@/common/_feat/use-fetch-api/handleFetchOperation.ts";
import {RequestOptions} from "@/common/_types/request/RequestOptions.ts";
import {buildURL} from "@/common/_feat/fetch-api";

/**
 * Parameters for creating a new document.
 */
export type CreateDocumentConfig<TData = unknown> = {
    data: TData;
    config?: Pick<RequestOptions, "virtuals" | "populate">;
};

/**
 * Generates an asynchronous fetcher for resource creation using the POST method.
 */
export function handleCreate(baseURL: string) {
    return async <TData = unknown, TReturns = unknown>(
        {config, data}: CreateDocumentConfig<TData>
    ): Promise<FetchRequestReturns<TReturns>> => {
        const url = buildURL({
            baseURL,
            path: `/item`,
            queries: config,
        });

        return handleFetchOperation({url, method: "POST", data});
    };
}