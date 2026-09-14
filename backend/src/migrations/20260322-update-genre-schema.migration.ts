/**
 * @fileoverview Data migration script to synchronize genre movie counts.
 * Iterates through all genres and recalculates movie associations for accuracy.
 */

import "dotenv/config";
import {connect} from "@/config/database.js";
import mongoose from "mongoose";
import {MovieModel} from "@/domains/movies/_models/movie/Movie.model";
import {GenreModel} from "@/domains/genres/_models/genre";

/**
 * Executes the synchronization process.
 */
connect().then(async () => {
    const cursor = GenreModel.find().cursor();

    for (
        let genre = await cursor.next();
        genre !== null;
        genre = await cursor.next()
    ) {
        /** Recalculate actual count from the Movie collection. */
        const count = await MovieModel.countDocuments({genres: genre._id});

        console.log(`Updating: ${genre.name} | Found: ${count} movies`);

        genre.movieCount = count ?? 0;
        await genre.save();
    }

    console.log("Migration completed successfully.");
}).catch((error: unknown) => {
    console.error("[MIGRATION ERROR] ", error);
}).finally(async () => {
    console.log("Closing database connection...");
    await mongoose.disconnect();
});