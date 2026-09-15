/**
 * @fileoverview Defines the CRUD express routes for user resource management.
 */

import type {Router} from "express";
import {buildCRUDRoutes, type CRUDRoute} from "@/shared/_feat/generic-crud/routes";
import {isAuth} from "@/domains/authentication/_middleware/isAuth";
import {isAdmin} from "@/domains/authentication/_middleware/isAdmin";
import {destroy, find, paginated} from "@/shared/_feat/generic-crud/path-handlers";
import {validateRequestConfig} from "@/shared/_utils/schema/validators/validateRequestConfig";
import {IDRouteConfigSchema} from "@/shared/_schema/route-config";
import {
    UserModerationLogQueryMatchStageSchema,
    UserModerationLogQuerySortStageSchema
} from "@/domains/users/_feat/validate-query";
import {buildAuthCRUDQueryStageMiddleware} from "@/shared/_feat/middleware";
import {UserModerationLogModel, type UserModerationLogSchemaFields} from "@/domains/users/_models/moderation-log";

const modelName = UserModerationLogModel.modelName;
const matchSchema = UserModerationLogQueryMatchStageSchema;
const sortSchema = UserModerationLogQuerySortStageSchema;

const queryMiddleware = buildAuthCRUDQueryStageMiddleware({modelName, matchSchema, sortSchema});

const routes: CRUDRoute<UserModerationLogSchemaFields>[] = [
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
        method: "delete",
        middleware: [isAuth, isAdmin, validateRequestConfig({schema: IDRouteConfigSchema})],
        handler: destroy
    },
];

const router: Router = buildCRUDRoutes<UserModerationLogSchemaFields>({
    model: UserModerationLogModel,
    routes: routes,
});

/** Express router containing CRUD endpoints for the User model. */
export {
    router as UserModerationLogCRUDRoutes,
};