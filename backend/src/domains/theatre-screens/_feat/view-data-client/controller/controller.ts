/**
 * @fileoverview Controller for handling client-side requests to view showing data by screen.
 */

import type {Request, Response} from "express";
import {validateRequestParameters} from "@/shared/_utils/schema/validators/validateRequestParameters";
import {fetchShowingsByTheatreScreens} from "@/domains/theatre-screens/_feat/view-data-client/service/fetchShowingsByTheatreScreens";
import {ShowingsByTheatreScreenQuerySchema} from "@/domains/theatre-screens/_feat/view-data-client/schema/ShowingsByTheatreScreenQuerySchema";

/**
 * Express controller that validates query parameters and returns showings grouped by screens for a specific theatre and date.
 */
export async function getFetchShowingsByTheatreScreens(req: Request, res: Response): Promise<Response> {
    const {theatreID, dateString} = validateRequestParameters({
        req,
        schema: ShowingsByTheatreScreenQuerySchema,
        errorMessage: "Invalid parameters. Must be a valid theatre and a valid date string.",
    });

    const data = await fetchShowingsByTheatreScreens({
        theatreID,
        dateString,
    });

    return res.status(200).json(data);
}
