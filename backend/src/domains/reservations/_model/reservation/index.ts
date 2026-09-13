import type {ReservationDoc, ReservationSchemaFields} from "@/domains/reservations/_model/reservation/Reservation.types";
import {type ReservationSchemaModel, ReservationSchema} from "@/domains/reservations/_model/reservation/Reservation.schema";
import {ReservationModel} from "@/domains/reservations/_model/reservation/Reservation.model";

export {
    ReservationSchema,
    ReservationModel,
}

export type {
    ReservationSchemaModel,
    ReservationSchemaFields,
    ReservationDoc,
}