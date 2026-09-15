/**
 * @fileoverview Express router for managing genre image updates and removals.
 */

import {Router} from "express";
import {patchRemoveGenreImage, patchUpdateGenreImage} from "@/domains/genres/_feat/manage-image/controller";
import {validateRequestConfig} from "@/shared/_utils/schema/validators/validateRequestConfig";
import {ManageGenreImageRouteConfigSchema} from "@/domains/genres/_feat/manage-image/schema/ManageGenreImageRouteConfig";
import {isAuth} from "@/domains/authentication/_middleware/isAuth";
import {isAdmin} from "@/domains/authentication/_middleware/isAdmin";
import asyncHandler from "@/shared/_utils/handlers/asyncHandler";
import {uploadImage} from "@/config/image-multr";
import {hasGenreImage} from "@/domains/genres/_feat/manage-image/middleware/hasGenreImage";

const router = Router();

router.patch(
    "/item/:_id/image/update",
    [
        isAuth,
        isAdmin,
        validateRequestConfig({schema: ManageGenreImageRouteConfigSchema}),
        uploadImage.single("image"),
        hasGenreImage,
    ],
    asyncHandler(patchUpdateGenreImage),
);

router.patch(
    "/item/:_id/image/remove",
    [
        isAuth,
        isAdmin,
        validateRequestConfig({schema: ManageGenreImageRouteConfigSchema}),
    ],
    asyncHandler(patchRemoveGenreImage),
)

/** Router instance for genre image management endpoints. */
export {
    router as GenreAdminImageManagementRoutes
}