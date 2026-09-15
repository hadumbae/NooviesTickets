import {Router} from "express";
import {isAuth} from "@/domains/authentication/_middleware/isAuth";
import asyncHandler from "@/shared/_utils/handlers/asyncHandler";
import {parseRequestQuery} from "@/shared/_feat/middleware";
import {MovieRequestQuerySchema} from "@/domains/movies/_feat/validate-query";
import {getFetchMovieLeanData, getFetchPersonLeanData, getFetchRoleTypeLeanData} from "@/domains/ui-inputs/controller";
import {PersonRequestQuerySchema} from "@/domains/persons/_feat/validate-query";
import {RoleTypeRequestQuerySchema} from "@/domains/role-types/_feat/validate-query";

const router = Router();

router.get(
    '/movies',
    [isAuth, parseRequestQuery({schema: MovieRequestQuerySchema})],
    asyncHandler(getFetchMovieLeanData),
);

router.get(
    '/persons',
    [isAuth, parseRequestQuery({schema: PersonRequestQuerySchema})],
    asyncHandler(getFetchPersonLeanData),
);

router.get(
    '/role-types',
    [isAuth, parseRequestQuery({schema: RoleTypeRequestQuerySchema})],
    asyncHandler(getFetchRoleTypeLeanData),
);

export {
    router as UIInputDataRoutes,
}