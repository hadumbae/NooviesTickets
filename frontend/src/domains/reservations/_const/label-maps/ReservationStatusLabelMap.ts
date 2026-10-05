/**
 * @fileoverview Label map for reservation status constants.
 */

import {ReservationStatus} from "@noovies-tickets/common";

/** Constant mapping of reservation status display names to their internal string values. */
export const ReservationStatusLabelMap: Record<ReservationStatus, string> = {
    "RESERVED": "Reserved",
    "PAID": "Paid",
    "RUNNING": "Running",
    "COMPLETED": "Completed",
    "CANCELLED": "Cancelled",
    "REFUNDED": "Refunded",
    "EXPIRED": "Expired",
    "INVALID": "Invalid",
};