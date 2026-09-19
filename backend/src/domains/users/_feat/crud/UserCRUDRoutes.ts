/**
 * @fileoverview Defines the CRUD express routes for user resource management.
 */

import type {Router} from "express";
import {buildCRUDRoutes, type CRUDRoute} from "@/shared/_feat/generic-crud/routes";
import {isAuth} from "@/domains/authentication/_middleware/isAuth";
import {isAdmin} from "@/domains/authentication/_middleware/isAdmin";
import {destroy, find, findById, paginated} from "@/shared/_feat/generic-crud/path-handlers";
import {validateRequestConfig} from "@/shared/_utils/schema/validators/validateRequestConfig";
import {IDRouteConfigSchema} from "@/shared/_schema/route-config";
import {UserModel, type UserSchemaFields} from "@/domains/users/_models/user";
import {UserQueryMatchStageSchema, UserQuerySortStageSchema} from "@/domains/users/_feat/validate-query";
import {buildAuthCRUDQueryStageMiddleware} from "@/shared/_feat/middleware";

const matchSchema = UserQueryMatchStageSchema;
const sortSchema = UserQuerySortStageSchema;

const queryMiddleware = buildAuthCRUDQueryStageMiddleware({matchSchema, sortSchema});

const routes: CRUDRoute<UserSchemaFields>[] = [
    {
        path: `/find`,
        method: "get",
        middleware: queryMiddleware,
        handler: find
    },
    {
        path: `/paginated`,
        method: "get",
        middleware: queryMiddleware,
        handler: paginated,
    },
    {
        path: `/item/:_id`,
        method: "get",
        middleware: [isAuth, validateRequestConfig({schema: IDRouteConfigSchema})],
        handler: findById
    },
    {
        path: `/item/:_id`,
        method: "delete",
        middleware: [isAuth, isAdmin, validateRequestConfig({schema: IDRouteConfigSchema})],
        handler: destroy
    },
];

const router: Router = buildCRUDRoutes<UserSchemaFields>({
    model: UserModel,
    routes: routes,
});

/** Express router containing CRUD endpoints for the User model. */
export {
    router as UserCRUDRoutes,
};