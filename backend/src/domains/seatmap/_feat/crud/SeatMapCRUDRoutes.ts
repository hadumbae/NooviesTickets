/**
 * @fileoverview Express router configuration for the SeatMap domain.
 * Provides standard CRUD endpoints and specialized aggregation query interfaces
 * for managing real-time seat availability and inventory.
 */

import {Router} from "express";
import {buildCRUDRoutes, type CRUDRoute} from "@/shared/_feat/generic-crud/routes";
import {isAuth} from "@/domains/authentication/_middleware/isAuth";
import {isAdmin} from "@/domains/authentication/_middleware/isAdmin";
import {parseQueryOptions} from "@/shared/_feat/middleware";
import {create, destroy, find, findById, paginated, update} from "@/shared/_feat/generic-crud/path-handlers";
import validateZodSchema from "@/shared/_utils/schema/validators/validateZodSchema";
import {validateRequestConfig} from "@/shared/_utils/schema/validators/validateRequestConfig";
import {IDRouteConfigSchema} from "@/shared/_schema/route-config";
import asyncHandler from "@/shared/_utils/handlers/asyncHandler";
import {aggregate} from "@/shared/_feat/generic-aggregate";
import type {SeatMapSchemaFields} from "@/domains/seatmap/_models/seat-map/SeatMap.types";
import {SeatMapModel} from "@/domains/seatmap/_models/seat-map/SeatMap.model";
import {SeatMapInputSchema} from "@/domains/seatmap/_feat/validate-submit/SeatMapInputSchema";
import {SeatMapQueryOptionsSchema} from "@/domains/seatmap/_feat/validate-query";
import {SeatMapPopulationPaths} from "@/domains/seatmap/_feat/query-population";
import {handleDuplicateIndex} from "@/domains/seatmap/_models/seat-map/SeatMap.handlers";
import {verifyReferencesExist} from "@/shared/_feat";
import {SeatModel} from "@/domains/seat";
import {ShowingModel} from "@/domains/showing";

const hasReferences = verifyReferencesExist({
    statusCode: 422,
    refs: [
        {key: "seat", model: SeatModel},
        {key: "showing", model: ShowingModel},
    ]
});

/**
 * CRUD route definitions for the SeatMap entity.
 */
const routes: CRUDRoute<SeatMapSchemaFields>[] = [
    {
        /** Basic retrieval of seat mappings based on query filters (e.g., all seats for a specific showtime). */
        path: "/find",
        method: "get",
        middleware: [
            isAuth,
            parseQueryOptions({schema: SeatMapQueryOptionsSchema, modelName: SeatMapModel.modelName})
        ],
        handler: find
    },
    {
        /** Paginated retrieval optimized for administrative inventory logs or large-scale seating audits. */
        path: "/paginated",
        method: "get",
        middleware: [
            isAuth,
            parseQueryOptions({schema: SeatMapQueryOptionsSchema, modelName: SeatMapModel.modelName})
        ],
        handler: paginated
    },
    {
        /** Manual creation of a seat map entry (typically handled by automated scheduling logic). */
        path: `/item`,
        method: "post",
        middleware: [isAuth, isAdmin, validateZodSchema(SeatMapInputSchema), hasReferences],
        handler: create
    },
    {
        /** Retrieval of a specific seat map record by its MongoDB Object ID. */
        path: `/item/:_id`,
        method: "get",
        middleware: [isAuth, validateRequestConfig({schema: IDRouteConfigSchema})],
        handler: findById
    },
    {
        /** Update of a seat's availability, status, or pricing for a specific showing. */
        path: `/item/:_id`,
        method: "patch",
        middleware: [isAuth, isAdmin, validateRequestConfig({schema: IDRouteConfigSchema}), validateZodSchema(SeatMapInputSchema), hasReferences],
        handler: update
    },
    {
        /** Permanent removal of a seat mapping entry. */
        path: `/item/:_id`,
        method: "delete",
        middleware: [isAuth, isAdmin, validateRequestConfig({schema: IDRouteConfigSchema})],
        handler: destroy
    },
];

/**
 * Orchestrates the creation of the router using the generic CRUD utility factory.
 */
const router: Router = buildCRUDRoutes<SeatMapSchemaFields>({
    model: SeatMapModel,
    routes: routes,
    populatePaths: SeatMapPopulationPaths,
    onDuplicateIndex: handleDuplicateIndex,
});

/**
 * Advanced aggregation endpoint for complex seating chart queries.
 */
router.get(
    "/query",
    [isAuth, parseQueryOptions({schema: SeatMapQueryOptionsSchema, modelName: SeatMapModel.modelName})],
    asyncHandler(aggregate({model: SeatMapModel})),
);

export {
    router as SeatMapCRUDRoutes,
};