/**
 * @fileoverview Express router defining endpoints for updating, canceling, and refunding reservations.
 */

import {Router} from "express";
import {isAuth} from "@/domains/authentication/_middleware/isAuth";
import {isAdmin} from "@/domains/authentication/_middleware/isAdmin";
import validateZodSchema from "@/shared/_utils/schema/validators/validateZodSchema";
import {ReservationNotesInputSchema} from "@/domains/reservations/_feat/update-reservations/schemas";
import asyncHandler from "@/shared/_utils/handlers/asyncHandler";
import {
    patchCancelReservation,
    patchRefundReservation,
    patchResetReservationExpiry,
    patchUpdateReservationNotes
} from "@/domains/reservations/_feat/update-reservations/controller";
import {validateRequestConfig} from "@/shared/_utils/schema/validators/validateRequestConfig";
import {IDRouteConfigSchema} from "@/shared/_schema";

const router = Router();

router.patch(
    "/update/:_id/notes",
    [
        isAuth,
        isAdmin,
        validateRequestConfig({schema: IDRouteConfigSchema}),
        validateZodSchema(ReservationNotesInputSchema),
    ],
    asyncHandler(patchUpdateReservationNotes),
);

router.patch(
    "/update/:_id/expiry",
    [
        isAuth,
        isAdmin,
        validateRequestConfig({schema: IDRouteConfigSchema}),
    ],
    asyncHandler(patchResetReservationExpiry),
);

router.patch(
    "/update/:_id/cancel",
    [
        isAuth,
        isAdmin,
        validateRequestConfig({schema: IDRouteConfigSchema}),
        validateZodSchema(ReservationNotesInputSchema),
    ],
    asyncHandler(patchCancelReservation),
);

router.patch(
    "/update/:_id/refund",
    [
        isAuth,
        isAdmin,
        validateRequestConfig({schema: IDRouteConfigSchema}),
        validateZodSchema(ReservationNotesInputSchema),
    ],
    asyncHandler(patchRefundReservation),
);

/** Express router instance for reservation update operations. */
export {
        router as ReservationAdminUpdateRoutes
}
