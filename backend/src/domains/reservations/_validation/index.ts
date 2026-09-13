import {
    type ReservationType,
    ReservationTypeSchema
} from "@/domains/reservations/_validation/ReservationTypeSchema";
import {ReservationTypeConstant} from "@/domains/reservations/_validation/ReservationTypeConstant";

export * from "@noovies-tickets/common";

export {
    ReservationTypeSchema,
    ReservationTypeConstant,
}

export type {
    ReservationType,
}
