/**
 * @fileoverview Registers feature-specific API routes for the client-facing application.
 */

import type {Express} from "express";
import type {RouteRegistration} from "../../registerRoutes";
import {ReservationClientFetchRoutes} from "@/domains/reservations/_feat/fetch-client-reservations/routes";
import {TheatreClientSearchRoutes} from "@/domains/theatres/_feat/search-theatres";
import {MovieClientReviewsRoutes} from "@/domains/movies/_feat/fetch-reviews-by-movie";
import {ReservationClientReserveRoutes} from "@/domains/reservations/_feat/reserve-tickets";
import {ReservationClientUpdateRoutes} from "@/domains/reservations/_feat/update-client-reservations";

/**
 * Mounts domain-specific routers to the Express application instance.
 */
export function registerClientFeaturesRoutes(app: Express) {
    const routes: RouteRegistration[] = [
        {path: "/api/v1/feat/reviews-by-movie", router: MovieClientReviewsRoutes},
        {path: "/api/v1/feat/reserve-tickets", router: ReservationClientReserveRoutes},
        {path: "/api/v1/feat/fetch-client-reservations", router: ReservationClientFetchRoutes},
        {path: "/api/v1/feat/update-client-reservations", router: ReservationClientUpdateRoutes},
        {path: "/api/v1/feat/search-theatres", router: TheatreClientSearchRoutes},
    ];

    for (const {path, router} of routes) {
        app.use(path, router);
    }
}