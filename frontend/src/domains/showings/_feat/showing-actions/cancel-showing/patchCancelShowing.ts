/**
 * @fileoverview API fetch utility for cancelling a movie showing entity.
 */

import {ObjectIdString} from "@noovies-tickets/common";
import {buildURL} from "@/shared/_feat/fetch-api/buildURL.ts";
import {Showing} from "@/domains/showings/_schema/showing/ShowingSchema.ts";
import {FetchRequestReturns} from "@/shared/_types/request/FetchRequestReturns.ts";
import {handleFetchOperation} from "@/shared/_feat/use-fetch-api/handleFetchOperation.ts";
import {ShowingActionsBaseURL} from "@/domains/showings/_feat/showing-actions/baseURL.ts";

/** Props for the FetchConfig type. */
type FetchConfig = {
    _id: ObjectIdString;
}

/**
 * Sends a PATCH request to cancel a specific movie showing.
 */
export async function patchCancelShowing(
    {_id}: FetchConfig,
): Promise<FetchRequestReturns<Showing>> {
    const url = buildURL({
        baseURL: ShowingActionsBaseURL,
        path: `/item/${_id}/cancel`,
    });

    return handleFetchOperation({url, method: "PATCH"});
}