/**
 * @fileoverview Express router configuration for the TheatreScreen domain.
 * Provides standard CRUD endpoints and an aggregation query interface.
 */

import {Router} from "express";
import {buildCRUDRoutes, type CRUDRoute} from "@/shared/_feat/generic-crud/routes";
import {isAuth} from "@/domains/authentication/_middleware/isAuth";
import {isAdmin} from "@/domains/authentication/_middleware/isAdmin";
import {buildAuthCRUDQueryStageMiddleware} from "@/shared/_feat/middleware";
import asyncHandler from "@/shared/_utils/handlers/asyncHandler";
import {aggregate} from "@/shared/_feat/generic-aggregate";
import {TheatreScreenModel, type TheatreScreenSchemaFields} from "@/domains/theatre-screens/_models/theatre-screen";
import {TheatreScreenInputSchema} from "@/domains/theatre-screens/_feat/validate-submit";
import {TheatreScreenQueryMatchStageSchema, TheatreScreenQuerySortStageSchema} from "@/domains/theatre-screens/_feat/validate-query";
import validateZodSchemaAsync from "@/shared/_utils/schema/validators/validateZodSchemaAsync";
import {validateRequestConfig} from "@/shared/_utils/schema/validators/validateRequestConfig";
import {IDRouteConfigSchema, SlugRouteConfigSchema} from "@/shared/_schema/route-config";
import {
    TheatreScreenPopulationPaths,
    TheatreScreenPopulationPipelines,
    TheatreScreenVirtualPipelines
} from "@/domains/theatre-screens/_feat/query-population";
import {
    create,
    destroy,
    find,
    findById,
    findBySlug,
    paginated,
    update
} from "@/shared/_feat/generic-crud/path-handlers";
import {deriveTheatreScreenData} from "@/domains/theatre-screens/_feat/crud/deriveTheatreScreenData";

const modelName = TheatreScreenModel.modelName;
const matchSchema = TheatreScreenQueryMatchStageSchema;
const sortSchema = TheatreScreenQuerySortStageSchema;

/**
 * CRUD route definitions for the TheatreScreen entity.
 */
const routes: CRUDRoute<TheatreScreenSchemaFields>[] = [
    {
        /** Basic retrieval based on query filters. */
        path: "/find",
        method: "get",
        middleware: buildAuthCRUDQueryStageMiddleware({modelName, matchSchema, sortSchema}),
        handler: find
    },
    {
        /** Paginated retrieval for UI tables and infinite scrolls. */
        path: "/paginated",
        method: "get",
        middleware: buildAuthCRUDQueryStageMiddleware({modelName, matchSchema, sortSchema}),
        handler: paginated
    },
    {
        /** Creation of a new TheatreScreen instance. */
        path: `/item`,
        method: "post",
        middleware: [isAuth, isAdmin, validateZodSchemaAsync(TheatreScreenInputSchema)],
        handler: create
    },
    {
        /** Retrieval of a specific TheatreScreen by Object ID. */
        path: `/item/:_id`,
        method: "get",
        middleware: [isAuth, validateRequestConfig({schema: IDRouteConfigSchema})],
        handler: findById
    },
    {
        /** Retrieval of a specific TheatreScreen by slug. */
        path: `/item/:slug/slug`,
        method: "get",
        middleware: [isAuth, validateRequestConfig({schema: SlugRouteConfigSchema})],
        handler: findBySlug
    },
    {
        /** Partial update of an existing TheatreScreen record. */
        path: `/item/:_id`,
        method: "patch",
        middleware: [isAuth, isAdmin, validateRequestConfig({schema: IDRouteConfigSchema}), validateZodSchemaAsync(TheatreScreenInputSchema)],
        handler: update
    },
    {
        /** Permanent deletion of a TheatreScreen record. */
        path: `/item/:_id`,
        method: "delete",
        middleware: [isAuth, isAdmin, validateRequestConfig({schema: IDRouteConfigSchema})],
        handler: destroy
    },
];

/**
 * Orchestrates the creation of the router with generic path handlers.
 */
const router: Router = buildCRUDRoutes<TheatreScreenSchemaFields>({
    model: TheatreScreenModel,
    routes: routes,
    populatePaths: TheatreScreenPopulationPaths,
    deriveData: deriveTheatreScreenData,
});



/**
 * Custom aggregation endpoint for complex queries and data reporting.
 */
router.get(
    "/query",
    buildAuthCRUDQueryStageMiddleware({modelName, matchSchema, sortSchema}),
    asyncHandler(aggregate({
        model: TheatreScreenModel,
        virtualsPipelines: TheatreScreenVirtualPipelines,
        populationPipelines: TheatreScreenPopulationPipelines,
    })),
);

export {
    router as TheatreScreenCRUDRoutes,
};