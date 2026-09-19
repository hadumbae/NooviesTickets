/**
 * @file API route definitions for client-side reservation queries.
 * @filename routes.ts
 */

import {Router} from "express";
import {isAuth} from "@/domains/authentication/_middleware/isAuth";
import asyncHandler from "@/shared/_utils/handlers/asyncHandler";
import {fetchReservationsForUser} from "@/domains/reservations/_feat/fetch-client-reservations/controllers";
import {parseQueryFilters, parseQuerySorts} from "@/shared/_feat";
import {
    CurrentUserReservationQueryFilterSchema,
    CurrentUserReservationQuerySortSchema,
} from "@/domains/reservations/_feat/fetch-client-reservations/current-user-reservations";
import {validateRequestConfig} from "@/shared/_utils/schema/validators/validateRequestConfig";
import {ClientReservationsRouteConfigSchema} from "@/domains/reservations/_feat/fetch-client-reservations/schema";

const router = Router();

/**
 * GET `/user/fetch-reservations`
 */
router.get(
    "/user/paginated",
    [
        isAuth,
        validateRequestConfig({schema: ClientReservationsRouteConfigSchema}),
        parseQueryFilters({schema: CurrentUserReservationQueryFilterSchema}),
        parseQuerySorts({schema: CurrentUserReservationQuerySortSchema}),
    ],
    asyncHandler(fetchReservationsForUser),
);

export {
    router as ReservationClientFetchRoutes,
};