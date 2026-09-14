/**
 * @fileoverview Express router configuration for the Theatre domain.
 */

import {Router} from "express";
import {buildCRUDRoutes, type CRUDRoute} from "@/shared/_feat/generic-crud/routes";
import {isAuth} from "@/domains/authentication/_middleware/isAuth";
import {isAdmin} from "@/domains/authentication/_middleware/isAdmin";
import {buildAuthCRUDQueryStageMiddleware} from "@/shared/_feat/middleware";
import {create, destroy, find, findById, findBySlug, paginated, update} from "@/shared/_feat/generic-crud/path-handlers";
import validateZodSchema from "@/shared/_utils/schema/validators/validateZodSchema";
import {validateRequestConfig} from "@/shared/_utils/schema/validators/validateRequestConfig";
import {IDRouteConfigSchema, SlugRouteConfigSchema} from "@/shared/_schema/route-config";
import asyncHandler from "@/shared/_utils/handlers/asyncHandler";
import {aggregate} from "@/shared/_feat/generic-aggregate";
import {TheatreQueryMatchStageSchema, TheatreQuerySortStageSchema} from "@/domains/theatre/_feat/validate-query";
import {TheatreModel, type TheatreSchemaFields} from "@/domains/theatre/model/theatre";
import {TheatreVirtualPipelines} from "@/domains/theatre/_feat/aggregate";
import {TheatreVirtualPopulationPaths} from "@/domains/theatre/_feat/crud/options/TheatreVirtualPopulationPaths";
import {TheatreInputSchema} from "@/domains/theatre/validation";

const modelName = TheatreModel.modelName;
const matchSchema = TheatreQueryMatchStageSchema;
const sortSchema = TheatreQuerySortStageSchema;

/** CRUD route definitions for the Theatre entity. */
const routes: CRUDRoute<TheatreSchemaFields>[] = [
    {
        /** Basic retrieval of theatres based on geographical or capacity filters. */
        path: "/find",
        method: "get",
        middleware: buildAuthCRUDQueryStageMiddleware({modelName, matchSchema, sortSchema}),
        handler: find
    },
    {
        /** Paginated retrieval for the Theatre Management administrative table. */
        path: "/paginated",
        method: "get",
        middleware: buildAuthCRUDQueryStageMiddleware({modelName, matchSchema, sortSchema}),
        handler: paginated
    },
    {
        /** Registration of a new theatre location. */
        path: `/item`,
        method: "post",
        middleware: [isAuth, isAdmin, validateZodSchema(TheatreInputSchema)],
        handler: create
    },
    {
        /** Retrieval of a specific theatre by its MongoDB Object ID. */
        path: `/item/:_id`,
        method: "get",
        middleware: [isAuth, validateRequestConfig({schema: IDRouteConfigSchema})],
        handler: findById
    },
    {
        /** Retrieval of a specific theatre via its SEO-friendly slug. */
        path: `/item/:slug/slug`,
        method: "get",
        middleware: [isAuth, validateRequestConfig({schema: SlugRouteConfigSchema})],
        handler: findBySlug
    },
    {
        /** Partial update of theatre details. */
        path: `/item/:_id`,
        method: "patch",
        middleware: [isAuth, isAdmin, validateRequestConfig({schema: IDRouteConfigSchema}), validateZodSchema(TheatreInputSchema)],
        handler: update
    },
    {
        /** Permanent removal of a theatre record from the database. */
        path: `/item/:_id`,
        method: "delete",
        middleware: [isAuth, isAdmin, validateRequestConfig({schema: IDRouteConfigSchema})],
        handler: destroy
    },
];

/** Orchestrates the creation of the router using a generic CRUD factory. */
const router: Router = buildCRUDRoutes<TheatreSchemaFields>({
    model: TheatreModel,
    routes: routes,
    populatePaths: TheatreVirtualPopulationPaths,
});

/** Advanced aggregation endpoint for complex reports or cross-entity data fetching. */
router.get(
    "/query",
    buildAuthCRUDQueryStageMiddleware({modelName, matchSchema, sortSchema}),
    asyncHandler(aggregate({model: TheatreModel, virtualsPipelines: TheatreVirtualPipelines})),
);

export {
    router as TheatreCRUDRoutes,
};