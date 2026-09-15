/**
 * @fileoverview Data access function for retrieving a single administrative reservation record.
 */

import type {DocumentType} from "@/shared/_types/mongoose/DocumentType";
import type {AdminReservation} from "@/domains/reservations/_feat/fetch-customer-reservations";
import {Types} from "mongoose";
import {ReservationModel} from "@/domains/reservations/_models/reservation";
import {LeanUserQuerySelectFields} from "@/domains/users";

/** Retrieves a reservation by its unique identifier with administrative-level detail. */
export function fetchAdminReservationByID(
    _id: Types.ObjectId
): Promise<DocumentType<AdminReservation> | null> {
    return ReservationModel
        .findById<DocumentType<AdminReservation>>(_id)
        .populate({path: "user", select: LeanUserQuerySelectFields});
}