/**
 * @fileoverview Express router for administrative movie showing action endpoints.
 */

import {Router} from "express";
import {isAdmin, isAuth} from "@/domains/authentication";
import {validateRequestConfig} from "@/shared/_utils/schema/validators/validateRequestConfig";
import asyncHandler from "@/shared/_utils/handlers/asyncHandler";
import {patchCancelShowing} from "@/domains/showings/_feat/showing-actions/cancel-showing/patchCancelShowing";
import {
    CancelShowingRouteConfigSchema
} from "@/domains/showings/_feat/showing-actions/cancel-showing/CancelShowingRouteConfigSchema";

const router = Router();

router.patch(
    "/item/:_id/cancel",
    [isAuth, isAdmin, validateRequestConfig({schema: CancelShowingRouteConfigSchema})],
    asyncHandler(patchCancelShowing)
);

/** Express router configured with administrative movie showing action routes. */
export {
    router as ShowingActionRoutes,
};