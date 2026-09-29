import {
    ReserveTicketInputBaseSchema, type ReserveTicketInputData,
    ReserveTicketInputSchema
} from "@/domains/reservations/_feat/reserve-tickets/schemas/inputSchema";
import {
    type ReserveTicketPersistenceData,
    ReserveTicketPersistenceSchema
} from "@/domains/reservations/_feat/reserve-tickets/schemas/persistenceSchema";


export {
    ReserveTicketInputBaseSchema,
    ReserveTicketInputSchema,
    ReserveTicketPersistenceSchema,
}

export type {
    ReserveTicketInputData,
    ReserveTicketPersistenceData,
}