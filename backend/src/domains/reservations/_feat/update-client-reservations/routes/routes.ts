/**
 * @fileoverview Express router for client-facing reservation update operations.
 */

import {Router} from "express";
import {isAuth} from "@/domains/authentication/_middleware/isAuth";
import asyncHandler from "@/shared/_utils/handlers/asyncHandler";

import {
    patchCancelClientReservation,
    patchCheckoutClientReservation,
} from "@/domains/reservations/_feat/update-client-reservations/controllers";
import {validateRequestConfig} from "@/shared/_utils/schema/validators/validateRequestConfig";
import {IDRouteConfigSchema} from "@/shared/_schema";

const router = Router();

/**
 * Completes checkout for an existing reservation.
 */
router.patch(
    "/checkout/:_id",
    [isAuth, validateRequestConfig(({schema: IDRouteConfigSchema}))],
    asyncHandler(patchCheckoutClientReservation),
);

/**
 * Cancels an existing reservation.
 */
router.patch(
    "/cancel/:_id",
    [isAuth, validateRequestConfig(({schema: IDRouteConfigSchema}))],
    asyncHandler(patchCancelClientReservation),
);

/** Router handling client reservation updates including checkout and cancellation. */
export {
    router as ReservationClientUpdateRoutes,
};
