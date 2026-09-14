import {Router} from "express";
import {PersonModel} from "@/domains/persons/_models";
import {parseQueryMatchStage, parseQuerySortStage} from "@/shared/_feat/middleware";
import {validateRequestConfig} from "@/shared/_utils/schema/validators/validateRequestConfig";
import {isAuth} from "@/domains/authentication/_middleware/isAuth";
import asyncHandler from "@/shared/_utils/handlers/asyncHandler";
import {
    getFetchBrowsePersonViewData,
    getFetchPersonInfoViewData,
} from "@/domains/persons/_feat/client-view-data/controller";
import {
    BrowsePersonRouteConfigSchema,
    BrowsePersonsQueryMatchStageSchema,
    BrowsePersonsQuerySortStageSchema
} from "@/domains/persons/_feat/client-view-data/browse-persons";
import {PersonInfoViewRouteConfigSchema} from "@/domains/persons/_feat/client-view-data/person-info";

const routes = Router();
const modelName = PersonModel.modelName;

routes.get(
    "/browse",
    [
        isAuth,
        validateRequestConfig({schema: BrowsePersonRouteConfigSchema, errorMessage: "Invalid pagination values."}),
        parseQueryMatchStage({schema: BrowsePersonsQueryMatchStageSchema, modelName}),
        parseQuerySortStage({schema: BrowsePersonsQuerySortStageSchema, modelName}),
    ],
    asyncHandler(getFetchBrowsePersonViewData),
);

routes.get(
    "/person/:slug/info",
    [
        isAuth,
        validateRequestConfig({schema: PersonInfoViewRouteConfigSchema, errorMessage: "Invalid slug or limit values."}),
    ],
    asyncHandler(getFetchPersonInfoViewData),
);

export {
    routes as PersonClientViewDataRoutes
}