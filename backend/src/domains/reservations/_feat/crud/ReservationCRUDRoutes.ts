import {ReservationModel, type ReservationSchemaFields} from "@/domains/reservations/_model/reservation";
import {ReservationQueryMatchStageSchema, ReservationQuerySortStageSchema} from "@/domains/reservations/_feat/validate-query-options";
import {buildAuthCRUDQueryStageMiddleware} from "@/shared/_feat/middleware";
import {destroy, findById, findBySlug} from "@/shared/_feat/generic-crud/path-handlers";
import {buildCRUDRoutes, type CRUDRoute} from "@/shared/_feat/generic-crud/routes";
import {isAuth} from "@/domains/authentication/_middleware/isAuth";
import {isAdmin} from "@/domains/authentication/_middleware/isAdmin";
import {validateRequestConfig} from "@/shared/_utils/schema/validators/validateRequestConfig";
import {IDRouteConfigSchema, SlugRouteConfigSchema} from "@/shared/_schema/route-config";
import type {Router} from "express";
import {ReservationPopulatePaths} from "@/domains/reservations/_feat/query-population";
import asyncHandler from "@/shared/_utils/handlers/asyncHandler";
import {aggregate} from "@/shared/_feat/generic-aggregate";

const modelName = ReservationModel.modelName;
const matchSchema = ReservationQueryMatchStageSchema;
const sortSchema = ReservationQuerySortStageSchema;

const routes: CRUDRoute<ReservationSchemaFields>[] = [
    {
        path: `/item/:_id`,
        method: "get",
        middleware: [isAuth, validateRequestConfig({schema: IDRouteConfigSchema})],
        handler: findById
    },
    {
        path: `/item/:slug/slug`,
        method: "get",
        middleware: [isAuth, validateRequestConfig({schema: SlugRouteConfigSchema})],
        handler: findBySlug
    },
    {
        path: `/item/:_id`,
        method: "delete",
        middleware: [isAuth, isAdmin, validateRequestConfig({schema: IDRouteConfigSchema})],
        handler: destroy
    },
];

const router: Router = buildCRUDRoutes<ReservationSchemaFields>({
    model: ReservationModel,
    routes: routes,
    populatePaths: ReservationPopulatePaths,
});

router.get(
    "/query",
    buildAuthCRUDQueryStageMiddleware({modelName, matchSchema, sortSchema}),
    asyncHandler(aggregate({model: ReservationModel})),
);

export {
    router as ReservationCRUDRoutes,
};