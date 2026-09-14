/**
 * @fileoverview Persistence service for current-user movie review operations.
 */
import type {
    CreateUserMovieReviewConfig,
    DeleteUserMovieReviewConfig,
    FetchPaginatedUserReviewsConfig,
    UpdateUserMovieReviewConfig
} from "@/domains/movie-reviews/_feat/current-user-reviews/service/service.types";
import {MovieReviewModel} from "@/domains/movie-reviews/_models/review/MovieReview.model";
import {MovieReviewPopulatePaths} from "@/domains/movie-reviews/_feat/query-population/MovieReviewPopulatePaths.js";
import populateQuery from "@/shared/_utils/mongoose/populateQuery.js";
import {handlePersistenceQuery} from "@/shared/_utils/mongoose/handlePersistenceQuery.js";
import {handleMovieReviewDuplicateIndex} from "@/domains/movie-reviews/_feat/handle-query/handleMovieReviewDuplicateIndex";
import type {
    MovieReviewSchemaFields,
    MyMovieReviewSchemaFields
} from "@/domains/movie-reviews/_models/review/MovieReview.types";
import createHttpError from "http-errors";
import {DocumentVersionError} from "@/shared/errors/DocumentVersionError.js";
import type {PaginationReturns} from "@/shared/_types/pagination/PaginationReturns";
import {
    MovieReviewPopulationPipelines
} from "@/domains/movie-reviews/_feat/query-population/MovieReviewPopulationPipelines.js";
import {Types} from "mongoose";
import {checkMovieReviewOwnership} from "@/domains/movie-reviews/_feat/check-ownership";

/** Fetches a single movie review enriched for the current user's view. */
export const fetchCurrentUserMovieReview = async (
    reviewID: Types.ObjectId
): Promise<MyMovieReviewSchemaFields> => {
    const [results] = await MovieReviewModel.aggregate<MyMovieReviewSchemaFields>([
        {$match: {_id: reviewID}},
        {$addFields: {helpfulCount: {$size: "$helpfulLikes"}}},
        {$project: {helpfulLikes: 0}},
        ...MovieReviewPopulationPipelines,
    ]);

    return results;
}

/** Fetches a paginated list of movie reviews authored by a specific user. */
export const fetchCurrentUserMovieReviewList = async (
    {userID, page, perPage}: FetchPaginatedUserReviewsConfig
): Promise<PaginationReturns<MovieReviewSchemaFields>> => {
    const [results] = await MovieReviewModel.aggregate<PaginationReturns<MovieReviewSchemaFields>>([
        {$match: {user: userID}},
        {
            $facet: {
                totalCount: [{$count: "count"}],
                items: [
                    {$sort: {createdAt: -1}},
                    {$skip: perPage * (page - 1)},
                    {$limit: perPage},
                    ...MovieReviewPopulationPipelines,
                    {$addFields: {helpfulCount: {$size: "$helpfulLikes"}}},
                    {$project: {helpfulLikes: 0}},
                ],
            },
        },
        {
            $project: {
                totalItems: {$ifNull: [{$arrayElemAt: ["$totalCount.count", 0]}, 0]},
                items: 1,
            },
        },
    ]);

    return results;
}

/** Creates a new movie review for the authenticated user. */
export async function createMovieReviewForCurrentUser(
    {userID, data, options}: CreateUserMovieReviewConfig
): Promise<MovieReviewSchemaFields> {
    const userReviewData = {...data, user: userID};

    const doc = await handlePersistenceQuery({
        query: () => MovieReviewModel.create(userReviewData),
        onDuplicateIndexError: handleMovieReviewDuplicateIndex,
    });

    const query = populateQuery({
        query: MovieReviewModel.findById(doc._id),
        config: {...options, populatePaths: MovieReviewPopulatePaths},
    });

    return query.orFail();
}

/** Updates an existing movie review authored by the current user. */
export async function updateMovieReviewForCurrentUser(
    {userID, reviewID, data, unset, options}: UpdateUserMovieReviewConfig
): Promise<MovieReviewSchemaFields> {
    const isOwner = checkMovieReviewOwnership({userID, reviewID});
    if (!isOwner) throw createHttpError(403, "Invalid User, Can Only Update Owned Review.");

    const docToUpdate = await MovieReviewModel.findById(reviewID).orFail();

    docToUpdate.set(data);
    if (unset) Object.keys(unset).forEach((key) => docToUpdate.set(key, undefined));

    await handlePersistenceQuery({
        query: () => docToUpdate.save(),
        retries: 3,
        modelName: MovieReviewModel.modelName,
        onDuplicateIndexError: handleMovieReviewDuplicateIndex,
        onVersionError: () => {
            throw new DocumentVersionError({
                _id: reviewID,
                model: MovieReviewModel.modelName,
                raw: data,
                message: "Document version error with movie review.",
            });
        },
    });

    const updatedQuery = populateQuery({
        query: MovieReviewModel.findById(reviewID),
        config: {...options, populatePaths: MovieReviewPopulatePaths}
    });

    return updatedQuery.orFail();
}

/** Deletes a movie review authored by the current user. */
export async function deleteMovieReviewForCurrentUser(
    {userID, reviewID}: DeleteUserMovieReviewConfig
): Promise<void> {
    const review = await MovieReviewModel.findById(reviewID).orFail();

    const isOwner = checkMovieReviewOwnership({userID, reviewID});
    if (!isOwner) throw createHttpError(403, "Invalid User, Can Only Delete Owned Review.");

    await review.deleteOne();
}