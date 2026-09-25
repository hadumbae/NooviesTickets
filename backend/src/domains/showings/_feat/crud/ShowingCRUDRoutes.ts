/**
 * @fileoverview Express router configuration for the Showing domain.
 *
 * Provides standard CRUD endpoints and specialized aggregation query interfaces for managing cinema showtimes.
 */

import {Router} from "express";
import {buildCRUDRoutes, type CRUDRoute} from "@/shared/_feat/generic-crud/routes";
import {isAuth} from "@/domains/authentication/_middleware/isAuth";
import {isAdmin} from "@/domains/authentication/_middleware/isAdmin";
import {buildAuthCRUDQueryStageMiddleware} from "@/shared/_feat/middleware";
import {
    create,
    destroy,
    find,
    findById,
    findBySlug,
    paginated, softDelete,
    update
} from "@/shared/_feat/generic-crud/path-handlers";
import {validateZodSchema} from "@/shared/_utils/schema/validators/validateZodSchema";
import {validateRequestConfig} from "@/shared/_utils/schema/validators/validateRequestConfig";
import {IDRouteConfigSchema, SlugRouteConfigSchema} from "@/shared/_schema/route-config";
import asyncHandler from "@/shared/_utils/handlers/asyncHandler";
import {aggregate} from "@/shared/_feat/generic-aggregate";
import type {ShowingSchemaFields} from "@/domains/showings/_models/showing/Showing.types";
import {ShowingModel} from "@/domains/showings/_models/showing/Showing.model";
import {ShowingQueryMatchStageSchema, ShowingQuerySortStageSchema} from "@/domains/showings/_feat/validate-query";
import {type ShowingInput, ShowingInputSchema} from "@/domains/showings/_feat/validate-submit/ShowingInputSchema";
import {ShowingPopulationPaths} from "@/domains/showings/_feat/query-population";
import {ShowingPopulationPipelines} from "@/domains/showings/_feat/query-population/ShowingPopulationPipelines";
import {ShowingSeatMapVirtualPipelines} from "@/domains/showings/_feat/query-population/ShowingSeatMapVirtualPipelines";
import {buildShowingDerivedFields} from "@/domains/showings/_feat/crud/buildShowingDerivedFields";

const authCRUDMiddleware = buildAuthCRUDQueryStageMiddleware({
    matchSchema: ShowingQueryMatchStageSchema,
    sortSchema: ShowingQuerySortStageSchema,
});

/** CRUD route definitions for the Showing entity. */
const routes: CRUDRoute<ShowingSchemaFields>[] = [
    {
        /** Basic retrieval of showtimes based on IDs or operational status. */
        path: "/find",
        method: "get",
        middleware: authCRUDMiddleware,
        handler: find
    },
    {
        /** Paginated retrieval for theater schedule management tables. */
        path: "/paginated",
        method: "get",
        middleware: authCRUDMiddleware,
        handler: paginated
    },
    {
        /** Creation of a new showtime entry. */
        path: `/item`,
        method: "post",
        middleware: [isAuth, isAdmin, validateZodSchema(ShowingInputSchema)],
        handler: create
    },
    {
        /** Retrieval of a specific showing by its MongoDB Object ID. */
        path: `/item/:_id`,
        method: "get",
        middleware: [isAuth, validateRequestConfig({schema: IDRouteConfigSchema})],
        handler: findById
    },
    {
        /** Retrieval of a specific showing via its unique slug. */
        path: `/item/:slug/slug`,
        method: "get",
        middleware: [isAuth, validateRequestConfig({schema: SlugRouteConfigSchema})],
        handler: findBySlug
    },
    {
        /** Update of showtime details (e.g., status changes, price updates, or time shifts). */
        path: `/item/:_id`,
        method: "patch",
        middleware: [isAuth, isAdmin, validateRequestConfig({schema: IDRouteConfigSchema}), validateZodSchema(ShowingInputSchema)],
        handler: update
    },
    {
        /** Cancellation/Removal of a scheduled showing. */
        path: `/item/:_id`,
        method: "delete",
        middleware: [isAuth, isAdmin, validateRequestConfig({schema: IDRouteConfigSchema})],
        handler: destroy
    },
    {
        /** Cancellation/Removal of a scheduled showing. */
        path: `/item/:_id/soft`,
        method: "delete",
        middleware: [isAuth, isAdmin, validateRequestConfig({schema: IDRouteConfigSchema})],
        handler: softDelete
    },
];

/** Orchestrates the creation of the router using the generic CRUD utility factory. */
const router: Router = buildCRUDRoutes<ShowingSchemaFields, ShowingInput>({
    model: ShowingModel,
    routes: routes,
    populatePaths: ShowingPopulationPaths,
    deriveData: buildShowingDerivedFields,
});

/** Advanced aggregation endpoint for complex scheduling lookups. */
router.get(
    "/query",
    authCRUDMiddleware,
    asyncHandler(
        aggregate({
            model: ShowingModel,
            populationPipelines: ShowingPopulationPipelines,
            virtualsPipelines: ShowingSeatMapVirtualPipelines,
        })
    ),
);

export {
    router as ShowingCRUDRoutes,
};
