/**
 * @fileoverview Route controller for fetching movie showings admin view data.
 */

import type {Request, Response} from "express";
import type {MovieShowingsViewRouteConfig} from "@/domains/movies/_feat/admin-view-data/showings/routeConfigSchema";
import {fetchMovieWithShowings} from "@/domains/movies/_feat/admin-view-data/showings/fetchMovieWithShowings";

/** Retrieves and returns movie details and associated paginated showings for the admin view. */
export async function getFetchMovieShowingsViewData(req: Request, res: Response): Promise<Response> {
    const {slug, page, perPage} = req.parsedConfig as MovieShowingsViewRouteConfig;
    const data = await fetchMovieWithShowings({slug, page, perPage});

    return res.status(200).json(data);
}