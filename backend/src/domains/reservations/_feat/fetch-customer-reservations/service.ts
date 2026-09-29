/**
 * @fileoverview Service layer for administrative-level reservation retrieval and data hydration.
 */

import type {AdminReservation} from "@/domains/reservations/_feat/fetch-customer-reservations";
import {ReservationModel} from "@/domains/reservations/_models/reservation";
import {LeanUserQuerySelectFields} from "@/domains/users";

/** Parameters for retrieving a reservation via its human-readable verification code. */
export type FetchReservationByCodeParams = {
    /**
     * The unique ticket identifier (e.g., "RES-A1B2C-D3E4F").
     */
    uniqueCode: string;
}

/** Retrieves a single reservation by its unique identifier and populates basic user information. */
export const fetchByUniqueCode = async (
    {uniqueCode}: FetchReservationByCodeParams
): Promise<AdminReservation | null> => {
    return ReservationModel
        .findOne({uniqueCode})
        .populate({path: "user", select: LeanUserQuerySelectFields})
        .lean<AdminReservation>();
}
