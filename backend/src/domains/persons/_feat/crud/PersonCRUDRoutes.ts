/**
 * @fileoverview Express routing for Person administrative CRUD operations.
 * Leverages a generic CRUD builder to provide standardized endpoints for
 * searching, creating, updating, and deleting Person entities.
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
import {PersonModel, type PersonSchemaFields} from "@/domains/persons/_models/person";
import {PersonQueryMatchStageSchema, PersonQuerySortStageSchema} from "@/domains/persons/_feat/validate-query";
import {PersonInputSchema} from "@/domains/persons/_feat/validate-submit";
import asyncHandler from "@/shared/_utils/handlers/asyncHandler";
import {aggregate} from "@/shared/_feat/generic-aggregate";

const modelName = PersonModel.modelName;
const matchSchema = PersonQueryMatchStageSchema;
const sortSchema = PersonQuerySortStageSchema;

/**
 * Configuration for Person CRUD endpoints.
 */
const routes: CRUDRoute<PersonSchemaFields>[] = [
    {
        /** Basic retrieval of records based on query filters. */
        path: "/find",
        method: "get",
        middleware: buildAuthCRUDQueryStageMiddleware({modelName, matchSchema, sortSchema}),
        handler: find
    },
    {
        /** Paginated retrieval for administrative data tables. */
        path: "/paginated",
        method: "get",
        middleware: buildAuthCRUDQueryStageMiddleware({modelName, matchSchema, sortSchema}),
        handler: paginated
    },
    {
        /** Creation of a new Person record. */
        path: `/item`,
        method: "post",
        middleware: [isAuth, isAdmin, validateZodSchema(PersonInputSchema)],
        handler: create
    },
    {
        /** Retrieval of a specific Person by their database Object ID. */
        path: `/item/:_id`,
        method: "get",
        middleware: [isAuth, validateRequestConfig({schema: IDRouteConfigSchema})],
        handler: findById
    },
    {
        /** Retrieval of a specific Person by their SEO-friendly slug. */
        path: `/item/:slug/slug`,
        method: "get",
        middleware: [isAuth, validateRequestConfig({schema: SlugRouteConfigSchema})],
        handler: findBySlug
    },
    {
        /** Partial update of an existing Person record. */
        path: `/item/:_id`,
        method: "patch",
        middleware: [isAuth, isAdmin, validateRequestConfig({schema: IDRouteConfigSchema}), validateZodSchema(PersonInputSchema)],
        handler: update
    },
    {
        /** Permanent deletion of a Person record. */
        path: `/item/:_id`,
        method: "delete",
        middleware: [isAuth, isAdmin, validateRequestConfig({schema: IDRouteConfigSchema})],
        handler: destroy
    },
];

/**
 * The instantiated Express Router for Person CRUD operations.
 */
const router: Router = buildCRUDRoutes<PersonSchemaFields>({
    model: PersonModel,
    routes: routes,
});

/**
 * GET /query
 * Specialized aggregation endpoint for complex filtering and searching.
 */
router.get(
    "/query",
    buildAuthCRUDQueryStageMiddleware({modelName, matchSchema, sortSchema}),
    asyncHandler(aggregate({model: PersonModel})),
);

export {
    router as PersonCRUDRoutes,
};