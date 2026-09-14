/**
 * @fileoverview Higher-order function for generating standardized "Delete" request handlers.
 * Targets a specific resource by its unique identifier using the DELETE HTTP method,
 * adhering to standard RESTful patterns for item removal.
 */

import {FetchRequestReturns} from "@/shared/_types/request/FetchRequestReturns.ts";
import {handleFetchOperation} from "@/shared/_feat/use-fetch-api/handleFetchOperation.ts";
import {ObjectIdString} from "@noovies-tickets/common";
import {buildURL} from "@/shared/_feat/fetch-api";

/**
 * Parameters required to delete a specific document.
 */
export type DeleteDocumentConfig = {
    _id: ObjectIdString;
};

/**
 * Higher-order function that generates a fetcher for resource deletion.
 */
export function handleDelete(baseURL: string) {
    return async <TReturns = unknown>(
        {_id}: DeleteDocumentConfig
    ): Promise<FetchRequestReturns<TReturns>> => {
        const url = buildURL({
            baseURL,
            path: `/item/${_id}`,
        });

        return handleFetchOperation({url, method: "DELETE"});
    };
}