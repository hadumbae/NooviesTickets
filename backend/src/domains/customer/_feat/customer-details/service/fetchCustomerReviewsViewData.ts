/**
 * @fileoverview Service for fetching paginated movie reviews authored by a specific customer.
 */

import {type PipelineStage, Types} from "mongoose";
import {type CustomerMovieReviewSummary, MovieReviewModel} from "@/domains/movie-reviews";
import type {PaginationReturns} from "@/shared/_types/pagination";
import {LeanUserQuerySelectFields, type LeanUserSchemaFields, UserModel} from "@/domains/users";
import {MoviePopulationPipelines} from "@/domains/movies/_feat/query-population";
import {buildPaginationPipelines} from "@/shared/_feat/pagination-pipelines";
import type {PaginationOptions} from "@noovies-tickets/common";
import createHttpError from "http-errors";

/** Configuration for paginated retrieval of all reviews authored by a specific customer. */
export type FetchCustomerReviewsViewDataConfig = {
    userId: Types.ObjectId;
    pagination: PaginationOptions
}
/** Paginated response structure for a customer's review history. */
export type FetchCustomerReviewsViewData = {
    customer: LeanUserSchemaFields
    reviews: PaginationReturns<CustomerMovieReviewSummary>
}

/**
 * Fetches a paginated list of all reviews authored by a specific customer,
 * including populated movie information.
 */
export async function fetchCustomerReviewsViewData(
    {userId, pagination: {page, perPage}}: FetchCustomerReviewsViewDataConfig
): Promise<FetchCustomerReviewsViewData> {
    const customer = await UserModel.findById(userId).select(LeanUserQuerySelectFields);
    if (!customer) throw createHttpError(404, "Customer Not Found.");

    const reviewInnerStages: PipelineStage.FacetPipelineStage[] = [
        {$sort: {createdAt: -1}},
        {$skip: (page - 1) * perPage},
        {$limit: perPage},
        {
            $lookup: {
                from: "movies",
                localField: "movie",
                foreignField: "_id",
                as: "movie",
                pipeline: MoviePopulationPipelines,
            },
        },
        {$set: {movie: {$first: "$movie"}}},
        {$addFields: {helpfulCount: {$size: "$helpfulLikes"}}},
        {$project: {helpfulLikes: 0}},
    ]

    const [reviews] = await MovieReviewModel.aggregate<PaginationReturns<CustomerMovieReviewSummary>>([
        {$match: {user: customer._id}},
        ...buildPaginationPipelines({innerStages: reviewInnerStages}),
    ])

    return {
        customer,
        reviews,
    }
}