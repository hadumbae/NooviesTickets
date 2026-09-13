import {ShowingTime, ShowingTimeSchema} from "@/domains/showings/_schema/fields/ShowingTimeSchema.ts";
import {TicketPrice, TicketPriceSchema} from "@/domains/showings/_schema/fields/TicketPriceSchema.ts";

export * from "@noovies-tickets/common";

export {
    ShowingTimeSchema,
    TicketPriceSchema,
}

export type {
    ShowingTime,
    TicketPrice,
}