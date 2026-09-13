/**
 * @fileoverview API repository for client-side reservation updates including checkout and cancellation.
 *
 */

import {ObjectId} from "@/common/_schemas";
import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns.ts";
import {handleFetchOperation} from "@/common/_feat/use-fetch-api/handleFetchOperation.ts";
import {buildURL} from "@/common/_feat/fetch-api";

const baseURL = `/api/v1/feat/update-client-reservations`;

/** Transitions a pending reservation hold to a paid state. */
export const patchCheckoutTicket = (
    _id: ObjectId
): Promise<FetchRequestReturns<void>> => {
    const url = buildURL({
        baseURL: baseURL,
        path: `/checkout/${_id}`,
    });

    return handleFetchOperation({method: "PATCH", url});
};

/** Manually voids a reservation and releases any associated seat holds. */
export const patchCancelClientReservation = (
    _id: ObjectId
): Promise<FetchRequestReturns<void>> => {
    const url = buildURL({
        baseURL: baseURL,
        path: `/cancel/${_id}`,
    });

    return handleFetchOperation({method: "PATCH", url});
};