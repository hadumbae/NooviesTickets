/**
 * @file 20260121-add-slug-to-persons.migration.ts
 *
 * One-off maintenance script to backfill missing `slug` fields
 * on existing Person documents.
 *
 * - Iterates over all persons using a cursor
 * - Generates slugs from the `name` field when missing
 * - Persists updates safely per document
 * - Rebuilds indexes after completion
 *
 * Intended to be run manually in a controlled environment.
 */

import 'dotenv/config';

import mongoose from "mongoose";
import {connect} from "@/config/database.js";
import {generateSlug} from "@noovies-tickets/common";
import {MovieCreditModel} from "@/domains/movie-credits/_models/credit/MovieCredit.model";
import {PersonModel} from "@/domains/persons/_models/person";

/**
 * Connect to the database and update missing person slugs.
 */
connect().then(async () => {
    const cursor = MovieCreditModel.find().cursor();

    for (let credit = await cursor.next(); credit !== null; credit = await cursor.next()) {
        const person = await PersonModel.findById(credit.person);

        if (!credit.slug && person) {
            credit.slug = generateSlug(person.name);
            await credit.save();
        }
    }

    await MovieCreditModel.createIndexes();
    console.log("Done updating movie credits.");
}).catch((err) => {
    console.log(err);
}).finally(async () => {
    await mongoose.disconnect();
});
