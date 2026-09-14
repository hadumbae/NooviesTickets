/**
 * @fileoverview Mutation keys for updating client reservations.
 */

import {buildQueryKey} from "@/shared/_feat";

/** Mutation keys for reservation checkout and cancellation operations. */
export const UpdateClientReservationMutationKeys = buildQueryKey(
    ["reservations", "tickets"],
    {checkout: ["checkout"], cancel: ["cancel"]}
);