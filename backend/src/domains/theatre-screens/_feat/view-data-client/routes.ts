import {Router} from "express";
import asyncHandler from "@/shared/_utils/handlers/asyncHandler";
import {getFetchShowingsByTheatreScreens} from "@/domains/theatre-screens/_feat/view-data-client/controller/controller";
import {validateRequestConfig} from "@/shared/_utils/schema/validators/validateRequestConfig";
import {ShowingsByTheatreScreenQuerySchema} from "@/domains/theatre-screens";

const router = Router();

router.get(
    "/showings-by-screen/theatre/:theatreID/date/:dateString",
    [validateRequestConfig({schema: ShowingsByTheatreScreenQuerySchema})],
    asyncHandler(getFetchShowingsByTheatreScreens),
);

export {
    router as TheatreScreenClientViewDataRoutes,
}
