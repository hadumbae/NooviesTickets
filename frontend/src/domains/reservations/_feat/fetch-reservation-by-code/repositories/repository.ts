/**
 * @fileoverview Data repository for administrative reservation retrieval by unique code.
 */

import {handleFetchOperation} from "@/shared/_feat/use-fetch-api/handleFetchOperation.ts";
import {FetchRequestReturns} from "@/shared/_types/request/FetchRequestReturns.ts";
import {buildURL} from "@/shared/_feat/fetch-api";
import {FetchByCodeData} from "@/domains/reservations/_feat/fetch-reservation-by-code/schemas";
import {
    GetFetchByCodeParams
} from "@/domains/reservations/_feat/fetch-reservation-by-code/repositories/repository.types.ts";
import {
    FetchReservationByCodeBaseURL
} from "@/domains/reservations/_feat/fetch-reservation-by-code/repositories/baseURL.ts";

/** Dispatches an authenticated GET request to resolve a reservation via its verification code. */
export const getFetchByCode = (
    {code}: GetFetchByCodeParams
): Promise<FetchRequestReturns<FetchByCodeData>> => {
    const url = buildURL({
        baseURL: FetchReservationByCodeBaseURL,
        path: `/fetch-by-code/${code}`,
    });

    return handleFetchOperation({method: "GET", url});
}