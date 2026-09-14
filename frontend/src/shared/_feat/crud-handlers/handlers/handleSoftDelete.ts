/**
 * @fileoverview Higher-order function for generating standardized "Soft Delete" request handlers.
 * Facilitates marking a resource as deleted without permanent removal from the database.
 */

import {FetchRequestReturns} from "@/shared/_types/request/FetchRequestReturns.ts";
import {handleFetchOperation} from "@/shared/_feat/use-fetch-api/handleFetchOperation.ts";
import {ObjectIdString} from "@noovies-tickets/common";
import {buildURL} from "@/shared/_feat/fetch-api";

/**
 * Parameters required to soft-delete a specific document.
 */
export type SoftDeleteDocumentConfig = {
    _id: ObjectIdString;
};

/**
 * Generates an asynchronous fetcher for soft-deleting a resource using the DELETE method.
 */
export function handleSoftDelete(baseURL: string) {
    return async <TReturns = unknown>(
        {_id}: SoftDeleteDocumentConfig
    ): Promise<FetchRequestReturns<TReturns>> => {
        const url = buildURL({
            baseURL,
            path: `/item/${_id}/soft`,
        });

        return handleFetchOperation({url, method: "DELETE"});
    };
}