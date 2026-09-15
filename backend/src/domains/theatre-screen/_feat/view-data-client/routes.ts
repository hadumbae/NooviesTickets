import {Router} from "express";
import asyncHandler from "@/shared/_utils/handlers/asyncHandler";
import {getFetchShowingsByTheatreScreens} from "@/domains/theatre-screen/_feat/view-data-client/controller/controller";

const router = Router();

router.get(
    "/showings-by-screen/theatre/:theatreID/date/:dateString",
    asyncHandler(getFetchShowingsByTheatreScreens),
);

export {
    router as TheatreScreenClientViewDataRoutes,
}
