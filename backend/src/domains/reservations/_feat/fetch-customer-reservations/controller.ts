/**
 * @fileoverview Express controller for retrieving customer reservations via unique codes.
 */

import type {Request, Response} from "express";
import type {ControllerAsyncFunc} from "@/shared/_types/controllers/ControllerTypes";
import {fetchByUniqueCode} from "@/domains/reservations/_feat/fetch-customer-reservations/service";
import type {UniqueCodeRouteConfig} from "@/shared/_schema";

/** Retrieves a single reservation using the unique code provided in the request parameters. */
export const getFetchByUniqueCode: ControllerAsyncFunc = async (
    req: Request, res: Response
): Promise<Response> => {
    const {uniqueCode} = req.parsedConfig as UniqueCodeRouteConfig;
    const reservation = await fetchByUniqueCode({uniqueCode});

    return res.status(200).json({
        code: uniqueCode,
        reservation,
        message: reservation ? "Reservation found." : "Reservation not found.",
    });
}