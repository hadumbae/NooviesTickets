/**
 * @fileoverview Service layer for administrative-level reservation retrieval and data hydration.
 */

import type {FetchReservationByCodeParams} from "@/domains/reservations/_feat/fetch-customer-reservations/service/service.types";
import type {AdminReservation} from "@/domains/reservations/_feat/fetch-customer-reservations";
import {ReservationModel} from "@/domains/reservations/_models/reservation";
import {LeanUserQuerySelectFields} from "@/domains/users";

/** Retrieves a single reservation by its unique identifier and populates basic user information. */
export const fetchByUniqueCode = async (
    {uniqueCode}: FetchReservationByCodeParams
): Promise<AdminReservation | null> => {
    return ReservationModel
        .findOne({uniqueCode})
        .populate({path: "user", select: LeanUserQuerySelectFields})
        .lean<AdminReservation>();
}