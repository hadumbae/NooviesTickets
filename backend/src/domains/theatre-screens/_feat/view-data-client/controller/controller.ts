/**
 * @fileoverview Controller for handling client-side requests to view showing data by screen.
 */

import type {Request, Response} from "express";
import {
    fetchShowingsByTheatreScreens
} from "@/domains/theatre-screens/_feat/view-data-client/service/fetchShowingsByTheatreScreens";
import {
    type ShowingsByTheatreScreenQuery
} from "@/domains/theatre-screens/_feat/view-data-client/schema/ShowingsByTheatreScreenQuerySchema";

/**
 * Express controller that validates query parameters and returns showings grouped by screens for a specific theatre and date.
 */
export async function getFetchShowingsByTheatreScreens(req: Request, res: Response): Promise<Response> {
    const {theatreID, dateString} = req.parsedConfig as ShowingsByTheatreScreenQuery;

    const data = await fetchShowingsByTheatreScreens({
        theatreID,
        dateString,
    });

    return res.status(200).json(data);
}
