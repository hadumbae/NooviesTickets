/**
 * @fileoverview Repository for administrative reservation update operations.
 */

import {buildURL} from "@/shared/_feat/fetch-api";
import {handleFetchOperation} from "@/shared/_feat/use-fetch-api/handleFetchOperation.ts";
import {FetchRequestReturns} from "@/shared/_types/request/FetchRequestReturns.ts";

import {AdminReservation} from "@/domains/reservations/_schema/model/admin-reservations/AdminReservationSchema.ts";
import {
    PatchCancelReservationParams,
    PatchRefundReservationParams,
    PatchResetReservationExpiryParams,
    PatchUpdateReservationNotesParams
} from "@/domains/reservations/_feat/update-reservations/repository/repository.types.ts";
import {UpdateReservationBaseURL} from "@/domains/reservations/_feat/update-reservations/repository/baseURL.ts";

/** Updates the administrative notes field for a specific reservation. */
export const patchUpdateReservationNotes = (
    {_id, data}: PatchUpdateReservationNotesParams
): Promise<FetchRequestReturns<AdminReservation>> => {
    const url = buildURL({
        baseURL: UpdateReservationBaseURL,
        path: `/update/${_id}/notes`
    });

    return handleFetchOperation({method: "PATCH", url, data});
}

/** Resets the expiration TTL of a pending reservation to prevent timeout. */
export const patchResetReservationExpiry = (
    {_id}: PatchResetReservationExpiryParams
): Promise<FetchRequestReturns<AdminReservation>> => {
    const url = buildURL({
        baseURL: UpdateReservationBaseURL,
        path: `/update/${_id}/expiry`
    });

    return handleFetchOperation({method: "PATCH", url});
}

/** Transitions a reservation status to cancelled. */
export const patchCancelReservation = (
    {_id, data}: PatchCancelReservationParams
): Promise<FetchRequestReturns<AdminReservation>> => {
    const url = buildURL({
        baseURL: UpdateReservationBaseURL,
        path: `/update/${_id}/cancel`
    });

    return handleFetchOperation({method: "PATCH", url, data});
}

/** Transitions a reservation status to refunded. */
export const patchRefundReservation = (
    {_id, data}: PatchRefundReservationParams
): Promise<FetchRequestReturns<AdminReservation>> => {
    const url = buildURL({
        baseURL: UpdateReservationBaseURL,
        path: `/update/${_id}/refund`
    });

    return handleFetchOperation({method: "PATCH", url, data});
}