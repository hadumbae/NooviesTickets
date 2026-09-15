/**
 * @fileoverview Express router for administrative Theatre TheatreScreen view data.
 * Handles specialized data aggregation routes required for screen management UIs.
 */

import {Router} from "express";
import {isAuth} from "@/domains/authentication/_middleware/isAuth";
import {isAdmin} from "@/domains/authentication/_middleware/isAdmin";
import {validateRequestConfig} from "@/shared/_utils/schema/validators/validateRequestConfig";
import {
    TheatreScreenDetailsViewRouteConfigSchema
} from "@/domains/theatre-screens/_feat/view-data-admin/schemas/TheatreScreenDetailsViewRouteConfigSchema";
import asyncHandler from "@/shared/_utils/handlers/asyncHandler";
import {getFetchTheatreScreenDetailsViewData} from "@/domains/theatre-screens/_feat/view-data-admin/controller";

const router = Router();

router.get(
    '/theatre/:theatreSlug/screen/:screenSlug/details',
    [isAuth, isAdmin, validateRequestConfig({schema: TheatreScreenDetailsViewRouteConfigSchema})],
    asyncHandler(getFetchTheatreScreenDetailsViewData)
);

export {
    router as TheatreScreenAdminViewDataRoutes
};