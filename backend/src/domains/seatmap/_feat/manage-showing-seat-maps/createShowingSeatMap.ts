/**
 * @fileoverview Logic for generating and persisting the initial seat map for a specific showing.
 */

import {ShowingModel} from "@/domains/showing/_models/showing/Showing.model";
import createHttpError from "http-errors";
import {SeatModel} from "@/domains/seat/_models";
import {type AnyBulkWriteOperation, Types} from "mongoose";
import type {SeatMapInputData} from "@/domains/seatmap/_models/seat-map/SeatMap.types";
import {SeatMapModel} from "@/domains/seatmap/_models/seat-map/SeatMap.model";

/** Configuration object containing the unique identifier for a showing. */
type ShowingConfig = {
    showingID: Types.ObjectId;
}

/**
 * Creates a collection of seat map documents based on the showing's theatre and screen layout.
 */
export async function createShowingSeatMap({showingID}: ShowingConfig): Promise<void> {
    // --- Fetch Showing ---
    const showing = await ShowingModel.findById(showingID);

    if (!showing) {
        throw createHttpError(404, "Showing Not Found.");
    }

    // --- Fetch Seats ---
    const {_id: seatShowing, ticketPrice: seatBasePrice, theatre, screen} = showing;

    const seats = await SeatModel.find({
        theatre,
        screen,
        layoutType: "SEAT",
        isAvailable: true,
    });

    if (seats.length === 0) {
        return;
    }

    // --- Build Seat Map Array ---
    const seatMap: AnyBulkWriteOperation<SeatMapInputData>[] = [];

    for (const {_id: seatID, priceMultiplier} of seats) {
        const document: SeatMapInputData = {
            seat: seatID,
            showing: seatShowing,
            basePrice: seatBasePrice,
            priceMultiplier,
            status: "AVAILABLE",
        };

        seatMap.push({insertOne: {document}});
    }

    // --- Create Seat Map ---
    await SeatMapModel.bulkWrite(seatMap);
}