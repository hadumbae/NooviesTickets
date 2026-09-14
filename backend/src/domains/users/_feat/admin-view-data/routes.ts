/**
 * @fileoverview Express router for fetching administrative user view data.
 */

import {Router} from "express";
import {isAdmin, isAuth} from "@/domains/authentication";
import {validateRequestConfig} from "@/shared/_utils/schema/validators/validateRequestConfig";
import {UserDetailsViewRouteConfigSchema} from "@/domains/users/_feat/admin-view-data/user-details-view";
import asyncHandler from "@/shared/_utils/handlers/asyncHandler";
import {getFetchUserDetailsViewData} from "@/domains/users/_feat/admin-view-data/controller";

const router = Router();

router.get(
    "/details/:userID",
    [isAuth, isAdmin, validateRequestConfig({schema: UserDetailsViewRouteConfigSchema})],
    asyncHandler(getFetchUserDetailsViewData),
);

/** Router containing administrative data endpoints for user views. */
export {
    router as UserAdminViewDataRoutes
}