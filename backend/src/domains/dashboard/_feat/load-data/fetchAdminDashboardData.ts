/**
 * @fileoverview Service for aggregating summary counts across multiple domains for the admin dashboard.
 */

import {GenreModel} from "@/domains/genres";
import {PersonModel} from "@/domains/persons";
import {TheatreModel} from "@/domains/theatres/_models/theatre";
import {MovieModel} from "@/domains/movies";
import {ShowingModel} from "@/domains/showings";
import {ReservationModel} from "@/domains/reservations";
import {RoleTypeModel} from "@/domains/role-types";
import {MovieReviewModel} from "@/domains/movie-reviews";

type AdminDashboardData = {
    genres: number,
    persons: number,
    theatres: number,
    movies: number,
    showings: number,
    activeShowings: number,
    reservations: number,
    activeReservations: number,
    roleTypes: number,
    movieReviews: number,
    publicMovieReviews: number,
}

/** Fetches total entity count metrics across various domain collections for admin analytics. */
export async function fetchAdminDashboardData(): Promise<AdminDashboardData> {
    const results = await Promise.all([
        GenreModel.countDocuments(),
        PersonModel.countDocuments(),
        TheatreModel.countDocuments(),
        MovieModel.countDocuments(),
        ShowingModel.countDocuments(),
        ShowingModel.countDocuments({status: {$in: ["SCHEDULED", "RUNNING", "SOLD_OUT"]}}),
        ReservationModel.countDocuments(),
        ReservationModel.countDocuments({status: {$in: ["RESERVED", "PAID"]}}),
        RoleTypeModel.countDocuments(),
        MovieReviewModel.countDocuments(),
        MovieReviewModel.countDocuments({isPublic: true}),
    ]);

    const [
        genres,
        persons,
        theatres,
        movies,
        showings,
        activeShowings,
        reservations,
        activeReservations,
        roleTypes,
        movieReviews,
        publicMovieReviews,
    ] = results;

    return {
        genres,
        persons,
        theatres,
        movies,
        showings,
        activeShowings,
        reservations,
        activeReservations,
        roleTypes,
        movieReviews,
        publicMovieReviews,
    };
}