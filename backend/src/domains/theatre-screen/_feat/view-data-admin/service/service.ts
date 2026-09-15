/**
 * @fileoverview Logic for aggregating data required by the Theatre TheatreScreen Details administrative view.
 * Performs parallel or sequential lookups to build a unified context of Theatre, TheatreScreen, and Seats.
 */

import {TheatreModel, type TheatreWithVirtuals} from "@/domains/theatre/_models/theatre";
import {TheatreVirtualPopulationPaths} from "@/domains/theatre/_feat/crud";
import createHttpError from "http-errors";
import {TheatreScreenModel} from "@/domains/theatre-screen/_models/theatre-screen";
import {SeatModel} from "@/domains/seat/_models";
import type {
    FetchTheatreScreenDetailsViewDataConfig,
    TheatreScreenDetailsViewData
} from "@/domains/theatre-screen/_feat/view-data-admin/service/service.types";
import {ShowingModel, ShowingPopulationPaths} from "@/domains/showing";

/**
 * Fetches the complete dataset for managing a specific screen.
 */
export async function fetchTheatreScreenDetailsViewData(
    {theatreSlug, screenSlug, recentShowingsCount}: FetchTheatreScreenDetailsViewDataConfig
): Promise<TheatreScreenDetailsViewData> {
    const theatre = await TheatreModel
        .findOne({slug: theatreSlug})
        .populate(TheatreVirtualPopulationPaths)
        .lean<TheatreWithVirtuals>({virtuals: true});

    if (!theatre) {
        throw createHttpError(404, "Theatre not found!");
    }

    const screen = await TheatreScreenModel
        .findOne({theatre: theatre._id, slug: screenSlug})
        .lean({virtuals: true});

    if (!screen) {
        throw createHttpError(404, "TheatreScreen not found!");
    }

    const seats = await SeatModel
        .find({screen: screen._id})
        .populate(["screen", "theatre"])
        .lean();

    const recentShowings = await ShowingModel
        .find({theatre: theatre._id, screen: screen._id})
        .sort({startTime: 1})
        .limit(recentShowingsCount ?? 10)
        .populate(ShowingPopulationPaths)
        .lean({virtuals: true});

    return {
        theatre,
        screen,
        seats,
        recentShowings,
    };
}