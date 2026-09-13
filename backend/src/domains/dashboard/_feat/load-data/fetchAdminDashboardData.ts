/**
 * @fileoverview Service for aggregating summary counts across multiple domains for the admin dashboard.
 */

import {GenreModel} from "@/domains/genres";
import {PersonModel} from "@/domains/persons";
import {TheatreModel} from "@/domains/theatre/model/theatre";
import {MovieModel} from "@/domains/movies";
import {Showing} from "@/domains/showing";
import {Reservation} from "@/domains/reservations";
import {RoleTypeModel} from "@/domains/role-types";
import {MovieReview} from "@/domains/movie-reviews";

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
        Showing.countDocuments(),
        Showing.countDocuments({status: {$in: ["SCHEDULED", "RUNNING", "SOLD_OUT"]}}),
        Reservation.countDocuments(),
        Reservation.countDocuments({status: {$in: ["RESERVED", "PAID"]}}),
        RoleTypeModel.countDocuments(),
        MovieReview.countDocuments(),
        MovieReview.countDocuments({isPublic: true}),
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