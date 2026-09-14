/**
 * @fileoverview Higher-order function for generating standardized "Update" request handlers.
 * Facilitates partial resource updates (PATCH) targeting a specific document ID,
 * while allowing for backend configuration via query parameters.
 */

import {FetchRequestReturns} from "@/shared/_types/request/FetchRequestReturns.ts";
import {handleFetchOperation} from "@/shared/_feat/use-fetch-api/handleFetchOperation.ts";
import {RequestOptions} from "@/shared/_types/request/RequestOptions.ts";
import {ObjectIdString} from "@noovies-tickets/common";
import {buildURL} from "@/shared/_feat/fetch-api";

/**
 * Parameters for updating a specific document.
 */
export type UpdateDocumentConfig<TData = unknown> = {
    _id: ObjectIdString;
    data: TData;
    config?: Omit<RequestOptions, "limit">;
};

/**
 * Higher-order function that generates a fetcher for resource updates.
 */
export function handleUpdate(baseURL: string) {
    return async <TData = unknown, TReturns = unknown>(
        {_id, config, data}: UpdateDocumentConfig<TData>
    ): Promise<FetchRequestReturns<TReturns>> => {
        const url = buildURL({
            baseURL,
            path: `/item/${_id}`,
            queries: config,
        });

        return handleFetchOperation({url, method: "PATCH", data});
    };
}