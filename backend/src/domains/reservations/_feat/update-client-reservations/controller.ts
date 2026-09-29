/**
 * @fileoverview Express controllers for client-side reservation lifecycle management.
 */

import type {Request, Response} from "express";
import {fetchRequestUserId} from "@/shared/_utils/request/fetchRequestUserId";
import type {IDRouteConfig} from "@/shared/_schema";
import {checkoutClientReservation} from "@/domains/reservations/_feat/update-client-reservations/checkout-client-reservation";
import {cancelClientReservation} from "@/domains/reservations/_feat/update-client-reservations/cancel-client-reservation";

/**
 * Finalizes a pending reservation hold for a client.
 */
export async function patchCheckoutClientReservation(req: Request, res: Response): Promise<Response> {
    const userID = fetchRequestUserId(req);
    const {_id} = req.parsedConfig as IDRouteConfig;

    const reservation = await checkoutClientReservation({
        userID,
        reservationID: _id,
    });

    return res.status(200).json(reservation);
}

/**
 * Processes a user-initiated cancellation of an existing reservation.
 */
export async function patchCancelClientReservation(req: Request, res: Response,): Promise<Response> {
    const userID = fetchRequestUserId(req);
    const {_id} = req.parsedConfig as IDRouteConfig;

    const reservation = await cancelClientReservation({
        userID,
        reservationID: _id,
    });

    return res.status(200).json(reservation);
}
