/**
 * @fileoverview Service for fetching and aggregating data required for the showing details admin view.
 */

import type {
    FetchShowingDetailsViewDataConfig,
    ShowingDetailsViewData
} from "@/domains/showing/_feat/admin-view-data/service/service.types";
import {ShowingModel} from "@/domains/showing/_models/showing/Showing.model";
import createHttpError from "http-errors";
import {TheatreModel} from "@/domains/theatre/_models/theatre";
import {TheatreScreenModel} from "@/domains/theatre-screen/_models/theatre-screen";
import {TheatreScreenPopulationPaths} from "@/domains/theatre-screen/_feat/query-population";
import {SeatMapModel} from "@/domains/seatmap/_models/seat-map/SeatMap.model";
import {SeatMapPopulationPaths} from "@/domains/seatmap/_feat/query-population";
import {MovieModel} from "@/domains/movies/_models/movie";
import {MoviePopulationPaths} from "@/domains/movies/_feat/query-population";
import {ShowingPopulationPaths} from "@/domains/showing/_feat/query-population";

/** Fetches a showing and its associated movie, theatre, screen, and seating data. */
export async function fetchShowingDetailsViewData(
    {slug}: FetchShowingDetailsViewDataConfig
): Promise<ShowingDetailsViewData> {
    const showing = await ShowingModel
        .findOne({slug})
        .populate(ShowingPopulationPaths)
        .lean({virtuals: true});

    if (!showing) {
        throw createHttpError(404, "Showing Not Found.");
    }

    const [movie, theatre, screen, seating] = await Promise.all([
        MovieModel.findById(showing.movie).populate(MoviePopulationPaths).lean({virtuals: true}),
        TheatreModel.findById(showing.theatre).lean({virtuals: true}),
        TheatreScreenModel.findById(showing.screen).populate(TheatreScreenPopulationPaths).lean({virtuals: true}),
        SeatMapModel.find({showing: showing._id}).populate(SeatMapPopulationPaths).lean({virtuals: true}),
    ]);

    if (!movie || !theatre || !screen) {
        throw createHttpError(404, "Showing Elements Not Found.");
    }

    return {
        showing,
        movie,
        theatre,
        screen,
        seating,
    }
}