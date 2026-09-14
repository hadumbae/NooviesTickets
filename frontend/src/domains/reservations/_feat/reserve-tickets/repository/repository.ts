/**
 * @fileoverview Repository for handling ticket reservation API requests.
 */

import {FetchRequestReturns} from "@/shared/_types/request/FetchRequestReturns.ts";
import {ReserveTicketFormData} from "@/domains/reservations/_feat/reserve-tickets/schema/ReserveTicketFormSchema.ts";
import {handleFetchOperation} from "@/shared/_feat/use-fetch-api/handleFetchOperation.ts";
import {buildURL} from "@/shared/_feat/fetch-api";
import {ReserveTicketBaseURL} from "@/domains/reservations/_feat/reserve-tickets/repository/baseURL.ts";

/** Submits a ticket reservation request to the backend service. */
export function postReserveTicket(data: ReserveTicketFormData): Promise<FetchRequestReturns> {
    const url = buildURL({
        baseURL: ReserveTicketBaseURL,
        path: "/reserve",
    });

    return handleFetchOperation({method: "POST", url, data});
}