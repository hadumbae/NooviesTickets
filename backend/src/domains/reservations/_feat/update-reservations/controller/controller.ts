/**
 * @fileoverview Express controllers for handling reservation update requests.
 */

import type {ControllerAsyncFunc} from "@/shared/_types/controllers/ControllerTypes";
import type {Request, Response} from "express";
import {
    cancelReservation,
    refundReservation,
    resetReservationExpiry,
    updateReservationNotes
} from "@/domains/reservations/_feat/update-reservations/service";
import type {IDRouteConfig} from "@/shared/_schema";

/** Handles the partial update of a reservation's administrative notes. */
export const patchUpdateReservationNotes: ControllerAsyncFunc = async (
    req: Request, res: Response
): Promise<Response> => {
    const data = req.validatedBody;
    const {_id} = req.parsedConfig as IDRouteConfig;

    const reservation = await updateReservationNotes({
        reservationID: _id,
        data,
    });

    return res.status(200).json(reservation);
}

/** Resets the expiration timer for a pending reservation. */
export const patchResetReservationExpiry: ControllerAsyncFunc = async (
    req: Request, res: Response
): Promise<Response> => {
    const {_id} = req.parsedConfig as IDRouteConfig;

    const reservation = await resetReservationExpiry({
        reservationID: _id,
        duration: {days: 1},
    });

    return res.status(200).json(reservation);
}

/** Transitions a reservation to a cancelled state. */
export const patchCancelReservation: ControllerAsyncFunc = async (
    req: Request, res: Response
): Promise<Response> => {
    const data = req.validatedBody;
    const {_id} = req.parsedConfig as IDRouteConfig;

    const reservation = await cancelReservation({
        reservationID: _id,
        data,
    });

    return res.status(200).json(reservation);
}

/** Processes a refund for a reservation and updates its status. */
export const patchRefundReservation: ControllerAsyncFunc = async (
    req: Request, res: Response
): Promise<Response> => {
    const data = req.validatedBody;
    const {_id} = req.parsedConfig as IDRouteConfig;

    const reservation = await refundReservation({
        reservationID: _id,
        data,
    });

    return res.status(200).json(reservation);
}