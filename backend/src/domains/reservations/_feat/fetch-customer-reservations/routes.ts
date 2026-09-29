/**
 * @file Express router defining administrative endpoints for reservation retrieval.
 */

import {Router} from "express";
import {isAuth} from "@/domains/authentication/_middleware/isAuth";
import {isAdmin} from "@/domains/authentication/_middleware/isAdmin";
import asyncHandler from "@/shared/_utils/handlers/asyncHandler";
import {getFetchByUniqueCode} from "@/domains/reservations/_feat/fetch-customer-reservations/controller";
import {validateRequestConfig} from "@/shared/_utils/schema/validators/validateRequestConfig";
import {UniqueCodeRouteConfigSchema} from "@/shared/_schema";

/**
 * Express Router instance for administrative Fetch operations.
 */
const router = Router();

/**
 * GET /fetch-by-code/:code
 */
router.get(
    "/fetch-by-code/:uniqueCode",
    [isAuth, isAdmin, validateRequestConfig({schema: UniqueCodeRouteConfigSchema})],
    asyncHandler(getFetchByUniqueCode)
);

export {
    router as ReservationAdminFetchRoutes,
}