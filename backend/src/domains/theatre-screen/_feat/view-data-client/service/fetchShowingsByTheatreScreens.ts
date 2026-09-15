/**
 * @fileoverview Service for fetching screens and their associated showings for a specific theatre and date.
 */

import type {TheatreScreenWithShowings} from "@/domains/theatre-screen/_models/theatre-screen/TheatreScreen.types";
import {getIdentifierFilter} from "@/shared/_utils/mongoose/getIdentifierFilter";
import {TheatreModel} from "@/domains/theatre/_models/theatre/Theatre.model";
import {type PipelineStage, Types} from "mongoose";
import {ShowingPopulationPipelines} from "@/domains/showing/_feat/query-population/ShowingPopulationPipelines";
import {ShowingSeatMapVirtualPipelines} from "@/domains/showing/_feat/query-population/ShowingSeatMapVirtualPipelines";
import {TheatreScreenModel} from "@/domains/theatre-screen/_models/theatre-screen/TheatreScreen.model";
import type {SlugString} from "@noovies-tickets/common";

/** Parameters for fetching showings grouped by screens. */
export type ShowingsByTheatreScreensParams = {
    theatreID: Types.ObjectId | SlugString;
    dateString: string;
};

/** Aggregates screens with their nested showings filtered by a specific date and theatre. */
export async function fetchShowingsByTheatreScreens(
    {theatreID, dateString}: ShowingsByTheatreScreensParams,
): Promise<TheatreScreenWithShowings[]> {
    const idFilter = getIdentifierFilter(theatreID);

    const {_id, location: {timezone}} = await TheatreModel
        .findOne(idFilter)
        .select("location")
        .orFail();

    const showingPipeline: PipelineStage[] = [
        {
            $addFields: {
                localDate: {
                    $dateToString: {
                        date: "$startTime",
                        timezone,
                        format: "%Y-%m-%d",
                    },
                },
            },
        },
        {$match: {localDate: dateString}},
        {$sort: {startTime: -1}},
        ...ShowingPopulationPipelines,
        ...ShowingSeatMapVirtualPipelines,
    ];

    const pipeline: PipelineStage[] = [
        {$match: {theatre: _id}},
        {
            $lookup: {
                from: "showings",
                localField: "_id",
                foreignField: "screen",
                as: "showings",
                pipeline: showingPipeline as any[],
            },
        },
        {
            $lookup: {
                from: "theatres",
                localField: "theatre",
                foreignField: "_id",
                as: "theatre",
            },
        },
        {
            $unwind: {
                path: "$theatre",
                preserveNullAndEmptyArrays: true,
            },
        },
    ];

    return TheatreScreenModel.aggregate(pipeline);
}