/**
 * @fileoverview Express router for public theatre search and discovery endpoints.
 */

import { Router } from "express";
import asyncHandler from "@/shared/_utils/handlers/asyncHandler";
import { getFetchTheatresByLocation } from "@/domains/theatres/_feat/search-theatres/controller";
import {isAuth} from "@/domains/authentication/_middleware/isAuth";
import {validateRequestConfig} from "@/shared/_utils/schema/validators/validateRequestConfig";
import {
    TheatresByLocationRouteConfigSchema
} from "@/domains/theatres/_feat/search-theatres/fetch-by-location/TheatresByLocationRouteConfigSchema";

const router = Router();

/**
 * Route for location-based theatre searches with support for pagination and movie showings.
 */
router.get(
    "/search/by-location/paginated",
    [isAuth, validateRequestConfig({schema: TheatresByLocationRouteConfigSchema})],
    asyncHandler(getFetchTheatresByLocation),
);

export {
    router as TheatreSearchRoutes,
};