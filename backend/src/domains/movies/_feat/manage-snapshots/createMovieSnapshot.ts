/**
 * @fileoverview Utility for generating immutable movie snapshots for historical records.
 */

import {MovieModel} from "@/domains/movies/_models/movie/Movie.model";
import type {MovieSnapshotSchemaFields} from "@/domains/movies/_models/movie-snapshot";
import {Types} from "mongoose";
import {DocumentNotFoundError} from "@/shared/_errors/DocumentNotFoundError";
import {InconsistentDataError} from "@/shared/_errors/InconsistentDataError";
import {MovieSnapshotModel} from "@/domains/movies/_models/movie-snapshot";
import type {MovieWithGenres} from "@/domains/movies/_models/movie/Movie.types";
import {MovieSnapshotInputSchema} from "@/domains/movies/_feat/validate-submit";

/** Fetches a movie by ID and validates its data against the snapshot schema. */
export async function createMovieSnapshot(
    movieID: Types.ObjectId
): Promise<MovieSnapshotSchemaFields> {
    const movie = await MovieModel.findById(movieID).populate(["genres"]).lean();

    if (!movie) {
        throw new DocumentNotFoundError({
            model: MovieModel,
            identifier: movieID,
            message: "Failed to fetch Movie for snapshot.",
        });
    }

    const {posterImage, genres} = movie as MovieWithGenres;
    const {data, success, error} = MovieSnapshotInputSchema.safeParse({
        ...movie,
        posterURL: posterImage?.secure_url,
        genres: genres.map(({name}) => name),
    });

    if (!success) {
        throw new InconsistentDataError({
            modelName: MovieSnapshotModel.name,
            message: "Inconsistent data, unable to create snapshot.",
            errors: error?.errors,
        });
    }

    return data;
}
