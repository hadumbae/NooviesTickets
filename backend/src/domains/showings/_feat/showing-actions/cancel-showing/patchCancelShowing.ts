/**
 * @fileoverview Express controller handler for cancelling a movie showing.
 */

import type {Request, Response} from "express";
import {cancelShowing} from "@/domains/showings/_feat/showing-actions/cancel-showing/cancelShowing";
import type {
    CancelShowingRouteConfig
} from "@/domains/showings/_feat/showing-actions/cancel-showing/CancelShowingRouteConfigSchema";

/**
 * Handles the HTTP request to cancel a movie showing and returns the updated record.
 */
export async function patchCancelShowing(req: Request, res: Response): Promise<Response> {
    const {_id} = req.parsedConfig as CancelShowingRouteConfig;
    const data = await cancelShowing({_id});

    return res.status(200).json(data);
}