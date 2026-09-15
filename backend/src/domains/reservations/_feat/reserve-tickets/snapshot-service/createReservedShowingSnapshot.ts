/**
 * @fileoverview Service for generating immutable data snapshots for reservations.
 */

import {Types} from "mongoose";
import {ShowingModel} from "@/domains/showing/_models/showing/Showing.model";
import {DocumentNotFoundError} from "@/shared/_errors/DocumentNotFoundError";
import {InconsistentDataError} from "@/shared/_errors/InconsistentDataError";
import {createMovieSnapshot} from "@/domains/movies/_feat/manage-snapshots/createMovieSnapshot";
import type {ShowingSchemaFields} from "@/domains/showing/_models/showing/Showing.types";
import {createReservedSeatSnapshot} from "@/domains/seatmap/_feat/manage-snapshots/createReservedSeatSnapshot";
import {ReservedShowingSnapshotInputSchema} from "@/domains/reservations/_feat/reserve-tickets/schemas";
import {createTheatreScreenSnapshot} from "@/domains/theatre-screen/_feat/build-snapshot";
import type {ReservationType} from "@noovies-tickets/common";
import type {ReservedShowingSnapshotSchemaFields} from "@/domains/reservations/_models/showing-snapshot";

type ShowingWithReferences = Omit<ShowingSchemaFields, "movie" | "theatre" | "screen"> & {
    movie: Types.ObjectId;
    theatre: Types.ObjectId;
    screen: Types.ObjectId;
}

/** Input parameters required to generate a historically accurate showing snapshot. */
export type CreateReservedShowingSnapshotParams = {
    pricePaid: number;
    ticketCount: number;
    reservationType: ReservationType;
    showingID: Types.ObjectId;
    selectedSeating?: Types.ObjectId[] | null | undefined;
};

/**
 * Orchestrates the creation of a deep, immutable snapshot for a specific reservation.
 */
export async function createReservedShowingSnapshot(
    {showingID, selectedSeating, pricePaid, ticketCount, reservationType}: CreateReservedShowingSnapshotParams
): Promise<ReservedShowingSnapshotSchemaFields> {
    const showing = await ShowingModel.findById(showingID).lean();

    if (!showing) {
        throw new DocumentNotFoundError({
            model: ShowingModel,
            identifier: showingID,
            message: "Failed to fetch showing for snapshot.",
        });
    }

    const {movie, screen, theatreSnapshot} = showing as ShowingWithReferences;

    const [movieSnapshot, screenSnapshot, seatSnapshot] = await Promise.all([
        createMovieSnapshot(movie),
        createTheatreScreenSnapshot(screen),
        createReservedSeatSnapshot(selectedSeating),
    ])

    const {data, success, error} = ReservedShowingSnapshotInputSchema.safeParse({
        ...showing,
        pricePaid,
        ticketCount,
        reservationType,
        theatre: theatreSnapshot,
        movie: movieSnapshot,
        screen: screenSnapshot,
        selectedSeats: seatSnapshot,
    });

    if (!success) {
        throw new InconsistentDataError({
            modelName: ShowingModel.name,
            message: "Inconsistent source data: unable to finalize reservation snapshot.",
            errors: error?.errors,
        });
    }

    return data;
}