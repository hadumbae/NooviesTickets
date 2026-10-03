/**
 * @fileoverview Express router configuration for the TheatreSeat domain.
 */

import {Router} from "express";
import {buildCRUDRoutes, type CRUDRoute} from "@/shared/_feat/generic-crud/routes";
import {isAuth} from "@/domains/authentication/_middleware/isAuth";
import {isAdmin} from "@/domains/authentication/_middleware/isAdmin";
import {buildAuthCRUDQueryStageMiddleware, buildUnsetFields} from "@/shared/_feat/middleware";
import {create, destroy, find, findById, findBySlug, paginated, update} from "@/shared/_feat/generic-crud/path-handlers";
import {validateZodSchema} from "@/shared/_utils/schema/validators/validateZodSchema";
import {validateRequestConfig} from "@/shared/_utils/schema/validators/validateRequestConfig";
import {IDRouteConfigSchema, SlugRouteConfigSchema} from "@/shared/_schema/route-config";
import asyncHandler from "@/shared/_utils/handlers/asyncHandler";
import {aggregate} from "@/shared/_feat/generic-aggregate";
import {TheatreSeatInputSchema} from "@/domains/theatre-seats/_feat/validate-submit";
import {TheatreSeatModel, type TheatreSeatSchemaFields} from "@/domains/theatre-seats/_models";
import {
    TheatreSeatQueryMatchStageSchema,
    TheatreSeatQuerySortStageSchema
} from "@/domains/theatre-seats/_feat/validate-query";

const matchSchema = TheatreSeatQueryMatchStageSchema;
const sortSchema = TheatreSeatQuerySortStageSchema;

/** CRUD route definitions for the TheatreSeat entity. */
const routes: CRUDRoute<TheatreSeatSchemaFields>[] = [
    {
        /** Basic retrieval based on query filters. */
        path: "/find",
        method: "get",
        middleware: buildAuthCRUDQueryStageMiddleware({matchSchema, sortSchema}),
        handler: find
    },
    {
        /** Paginated retrieval for UI tables and infinite scrolls. */
        path: "/paginated",
        method: "get",
        middleware: buildAuthCRUDQueryStageMiddleware({matchSchema, sortSchema}),
        handler: paginated
    },
    {
        /** Creation of a new TheatreSeat instance. */
        path: `/item`,
        method: "post",
        middleware: [isAuth, isAdmin, validateZodSchema(TheatreSeatInputSchema)],
        handler: create
    },
    {
        /** Retrieval of a specific TheatreSeat by Object ID. */
        path: `/item/:_id`,
        method: "get",
        middleware: [isAuth, validateRequestConfig({schema: IDRouteConfigSchema})],
        handler: findById
    },
    {
        /** Retrieval of a specific TheatreSeat by slug. */
        path: `/item/:slug/slug`,
        method: "get",
        middleware: [isAuth, validateRequestConfig({schema: SlugRouteConfigSchema})],
        handler: findBySlug
    },
    {
        /** Partial update of an existing TheatreSeat record. */
        path: `/item/:_id`,
        method: "patch",
        middleware: [
            isAuth,
            isAdmin,
            validateRequestConfig({schema: IDRouteConfigSchema}),
            validateZodSchema(TheatreSeatInputSchema),
            buildUnsetFields({
                model: TheatreSeatModel,
                excludeKeys: ["row", "x", "y", "layoutType", "theatre", "screen"],
            }),
        ],
        handler: update
    },
    {
        /** Permanent deletion of a TheatreSeat record. */
        path: `/item/:_id`,
        method: "delete",
        middleware: [isAuth, isAdmin, validateRequestConfig({schema: IDRouteConfigSchema})],
        handler: destroy
    },
];

/** Orchestrates the creation of the router with generic path handlers. */
const router: Router = buildCRUDRoutes<TheatreSeatSchemaFields>({
    model: TheatreSeatModel,
    routes: routes,
    populatePaths: ["screen", "theatre"],
});

/** Custom aggregation endpoint for complex queries and data reporting. */
router.get(
    "/query",
    buildAuthCRUDQueryStageMiddleware({matchSchema, sortSchema}),
    asyncHandler(aggregate({model: TheatreSeatModel})),
);

export {
    router as TheatreSeatCRUDRoutes,
};
