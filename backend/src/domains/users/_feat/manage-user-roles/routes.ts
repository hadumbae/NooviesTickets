/**
 * @fileoverview Express router configuring the middleware pipelines and patches for user role administration endpoints.
 */

import {Router} from "express";
import {isAdmin, isAuth} from "@/domains/authentication";
import {validateZodSchema} from "@/shared/_utils/schema/validators/validateZodSchema";
import {validateRequestConfig} from "@/shared/_utils/schema/validators/validateRequestConfig";
import asyncHandler from "@/shared/_utils/handlers/asyncHandler";
import {patchUpdateUserAdminRole} from "@/domains/users/_feat/manage-user-roles/controller";
import {UserAdminRoleUpdateInputSchema} from "@/domains/users/_feat/manage-user-roles/schema/UserAdminRoleUpdateInputSchema";
import {
    ManageUserRolesRouteConfigSchema
} from "@/domains/users/_feat/manage-user-roles/route-config/ManageUserRolesRouteConfigSchema";

const router = Router();

router.patch(
    "/user/:userId/role/admin/update",
    [
        isAuth,
        isAdmin,
        validateZodSchema(UserAdminRoleUpdateInputSchema),
        validateRequestConfig({schema: ManageUserRolesRouteConfigSchema}),
    ],
    asyncHandler(patchUpdateUserAdminRole),
);

/** Express router instance containing user role adjustment routes. */
export {
    router as UserAdminRolesRoutes
}