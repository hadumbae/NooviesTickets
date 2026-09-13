/**
 * @file 20260102-add-slug-to-seats.migration.ts
 * @summary Backfills missing `slug` values for Seat documents.
 *
 * @description
 * Connects to MongoDB, iterates through all Seat records using a cursor,
 * generates slugs for documents missing them, persists the updates, and
 * ensures all Seat indexes are created before disconnecting.
 *
 * Intended for one-off maintenance or migration usage.
 */

import 'dotenv/config';

import mongoose from "mongoose";
import {connect} from "@/shared/config/database.js";
import {generateSlug} from "@/shared/utility/generateSlug.js";
import {SeatModel} from "@/domains/seat/_models";

connect().then(async () => {
    const cursor = SeatModel.find().cursor();

    for (let seat = await cursor.next(); seat !== null; seat = await cursor.next()) {
        if (!seat.slug) {
            seat.slug = generateSlug(seat.layoutType);
            await seat.save();
        }
    }

    await SeatModel.createIndexes();
    console.log("Done updating seats.");
}).catch((err) => {
    console.log(err);
}).finally(async () => {
    await mongoose.disconnect();
});
