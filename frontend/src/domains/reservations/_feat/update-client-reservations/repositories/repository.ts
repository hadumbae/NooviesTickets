/**
 * @fileoverview API repository for client-side reservation updates including checkout and cancellation.
 *
 */

import {ObjectIdString} from "@noovies-tickets/common";
import {FetchRequestReturns} from "@/shared/_types/request/FetchRequestReturns.ts";
import {handleFetchOperation} from "@/shared/_feat/use-fetch-api/handleFetchOperation.ts";
import {buildURL} from "@/shared/_feat/fetch-api";

const baseURL = `/api/v1/feat/update-client-reservations`;

/** Transitions a pending reservation hold to a paid state. */
export const patchCheckoutTicket = (
    _id: ObjectIdString
): Promise<FetchRequestReturns<void>> => {
    const url = buildURL({
        baseURL: baseURL,
        path: `/checkout/${_id}`,
    });

    return handleFetchOperation({method: "PATCH", url});
};

/** Manually voids a reservation and releases any associated seat holds. */
export const patchCancelClientReservation = (
    _id: ObjectIdString
): Promise<FetchRequestReturns<void>> => {
    const url = buildURL({
        baseURL: baseURL,
        path: `/cancel/${_id}`,
    });

    return handleFetchOperation({method: "PATCH", url});
};