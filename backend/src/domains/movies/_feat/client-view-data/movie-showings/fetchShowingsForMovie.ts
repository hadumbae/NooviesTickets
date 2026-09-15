/**
 * @fileoverview Utility for fetching and filtering movie showings based on location and pagination.
 */

import {type FilterQuery, Types} from "mongoose";
import type {NonNegativeNumber, PositiveInteger} from "@noovies-tickets/common";
import type {DocumentType} from "@/shared/_types/mongoose/DocumentType";
import type {ISO3166Alpha2CountryCode} from "@noovies-tickets/common";
import type {ShowingSchemaFields} from "@/domains/showings/_models/showing/Showing.types";
import {generateFuzzyRegexPattern} from "@/shared/_utils/regex/generateFuzzyRegexPattern";
import {ShowingModel} from "@/domains/showings/_models/showing/Showing.model";
import {ShowingPopulationPipelines} from "@/domains/showings/_feat/query-population/ShowingPopulationPipelines";

/** Parameters for the fetchShowingsForMovie function. */
export type FetchShowingsForMovieConfig = {
    movieID: Types.ObjectId;
    queries: {
        page: PositiveInteger;
        perPage: PositiveInteger;
        country: ISO3166Alpha2CountryCode;
        near?: string;
    };
};

/** The paginated result set of showing documents. */
export type PaginatedShowingsForMovie = {
    totalItems: NonNegativeNumber;
    items: DocumentType<ShowingSchemaFields>[];
};

/** Retrieves a paginated list of active scheduled showings for a movie filtered by location. */
export async function fetchShowingsForMovie(
    {movieID, queries: {page, perPage, country, near}}: FetchShowingsForMovieConfig
): Promise<PaginatedShowingsForMovie> {
    const matchStage: FilterQuery<ShowingSchemaFields> = {
        movie: movieID,
        status: {$in: ["SCHEDULED", "SOLD_OUT"]},
        "config.isActive": true,
        "location.country": country,
        startTime: {$gt: new Date()}
    };

    if (near) {
        const locSearchRegex = {
            $regex: generateFuzzyRegexPattern(near),
            $options: "i",
        };

        matchStage.$or = [
            {"location.city": locSearchRegex},
            {"location.state": locSearchRegex},
            {"location.postalCode": locSearchRegex},
        ];
    }

    const [result] = await ShowingModel.aggregate<PaginatedShowingsForMovie>([
        {
            $match: matchStage
        },
        {
            $facet: {
                totalCount: [
                    {$count: "count"}
                ],
                items: [
                    {$skip: perPage * (page - 1)},
                    {$limit: perPage},
                    {$sort: {startTime: -1}},
                    ...ShowingPopulationPipelines,
                ],
            }
        },
        {
            $project: {
                items: 1,
                totalItems: {
                    $ifNull: [
                        {$arrayElemAt: ["$totalCount.count", 0]},
                        0
                    ],
                },
            }
        },
    ]);

    return result;
}