/**
 * @fileoverview Utility for clearing all scheduled lifecycle jobs for a specific reservation.
 */

import {Types} from "mongoose";
import {
    removeReservationLifecycleJob
} from "@/domains/reservations/_feat/reservation-queues/lifecycle/removeReservationLifecycleJob";

/** Clears all scheduled lifecycle jobs associated with a reservation. */
export async function clearReservationLifecycleQueue(_id: Types.ObjectId) {
    await removeReservationLifecycleJob({_id, job: "payment_expiry"});
    await removeReservationLifecycleJob({_id, job: "showing_running"});
    await removeReservationLifecycleJob({_id, job: "showing_completed"});
}