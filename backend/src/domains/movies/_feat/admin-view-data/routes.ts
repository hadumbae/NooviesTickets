/**
 * @fileoverview Express router defining authentication-protected administrative endpoints for fetching movie showings view data.
 */

import {Router} from "express";
import {isAuth} from "@/domains/authentication/_middleware/isAuth";
import {isAdmin} from "@/domains/authentication/_middleware/isAdmin";
import asyncHandler from "@/shared/_utils/handlers/asyncHandler";
import {getFetchMovieShowingsViewData} from "@/domains/movies/_feat/admin-view-data/controller";
import {validateRequestConfig} from "@/shared/_utils/schema/validators/validateRequestConfig";
import {MovieShowingsViewRouteConfigSchema} from "@/domains/movies/_feat/admin-view-data/showings/routeConfigSchema";

const router = Router();

router.get(
    "/item/:slug/showings",
    [isAuth, isAdmin, validateRequestConfig({schema: MovieShowingsViewRouteConfigSchema})],
    asyncHandler(getFetchMovieShowingsViewData),
);

export {
    /** Express router for movie admin view data endpoints. */
        router as MovieAdminViewDataRoutes,
}