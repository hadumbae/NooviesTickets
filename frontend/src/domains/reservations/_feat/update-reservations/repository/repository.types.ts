/**
 * @fileoverview Parameter type definitions for administrative reservation update repository functions.
 */

import {ObjectIdString} from "@noovies-tickets/common";
import {UpdateReservationNotesFormData} from "@/domains/reservations/_feat/update-reservations/forms";

/** Parameters for updating administrative notes on a reservation. */
export type PatchUpdateReservationNotesParams = {
    _id: ObjectIdString;
    data: UpdateReservationNotesFormData;
}

/** Parameters for resetting or extending a reservation's expiration TTL. */
export type PatchResetReservationExpiryParams = {
    _id: ObjectIdString;
}

/** Parameters for transitioning a reservation to a CANCELLED status. */
export type PatchCancelReservationParams = {
    _id: ObjectIdString;
    data: UpdateReservationNotesFormData;
}

/** Parameters for transitioning a reservation to a REFUNDED status. */
export type PatchRefundReservationParams = {
    _id: ObjectIdString;
    data: UpdateReservationNotesFormData;
}