/**
 * @file Express routes for IP-based geolocation endpoints.
 */

import {Router} from "express";
import asyncHandler from "@/shared/_utils/handlers/asyncHandler.js";
import {fetchIpApiGeoData} from "../controllers/IpApiController.js";

const router = Router();

/**
 * Retrieves geolocation data for the requesting IP.
 *
 * Middleware:
 * - `asyncHandler` – forwards async errors to Express error handling.
 *
 * Not auth-gated: relies on CORS to restrict browser-based callers to the configured frontend origin.
 */
router.get(
    "/get-geolocation",
    asyncHandler(fetchIpApiGeoData),
);

/** Router exposing IP geolocation endpoints. */
export {
    router as IpApiRoutes
};