import type {ReservationDoc, ReservationSchemaFields} from "@/domains/reservations/_models/reservation/Reservation.types";
import {type ReservationSchemaModel, ReservationSchema} from "@/domains/reservations/_models/reservation/Reservation.schema";
import {ReservationModel} from "@/domains/reservations/_models/reservation/Reservation.model";

export {
    ReservationSchema,
    ReservationModel,
}

export type {
    ReservationSchemaModel,
    ReservationSchemaFields,
    ReservationDoc,
}