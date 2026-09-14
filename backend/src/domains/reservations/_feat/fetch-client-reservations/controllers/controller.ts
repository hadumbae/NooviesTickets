/**
 * @fileoverview Controller for fetching paginated reservations for the authenticated user.
 */

import type {Request, Response} from "express";
import {fetchRequestUserId} from "@/shared/_utils/request/fetchRequestUserId";
import {
    type CurrentUserReservationQueryFilters,
    type CurrentUserReservationQuerySorts,
    fetchPaginatedUserReservations,
} from "@/domains/reservations/_feat/fetch-client-reservations/current-user-reservations";
import type {ClientReservationsRouteConfig} from "@/domains/reservations/_feat/fetch-client-reservations/schema";

/** Controller that retrieves and returns a paginated list of reservations for the currently authenticated user. */
export async function fetchReservationsForUser(req: Request, res: Response): Promise<Response> {
    const userID = fetchRequestUserId(req);
    const pagination = req.parsedConfig as ClientReservationsRouteConfig;

    const filters = req.queryFilters as CurrentUserReservationQueryFilters;
    const sorts = req.querySorts as CurrentUserReservationQuerySorts;

    const {totalItems, items} = await fetchPaginatedUserReservations({
        userID,
        pagination,
        filters,
        sorts,
    });

    return res.status(200).json({
        message: "Paginated reservations for authenticated user.",
        totalItems,
        items,
    });
}