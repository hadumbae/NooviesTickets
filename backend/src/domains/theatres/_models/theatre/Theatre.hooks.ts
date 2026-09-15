/**
 * @fileoverview Mongoose middleware for the Theatre entity.
 * Implements automated slug management, conditional population for optimized performance,
 * and strict cascading deletion to maintain database referential integrity.
 */

import {TheatreSchema} from "./Theatre.schema";
import type {HydratedDocument, Query} from "mongoose";
import {TheatreScreenModel} from "@/domains/theatre-screens/_models/theatre-screen";
import {ShowingModel} from "@/domains/showings/_models/showing/Showing.model";
import type {TheatreSchemaFields} from "./Theatre.types";
import {generateSlug} from "@noovies-tickets/common";
import {SeatModel} from "@/domains/seats/_models";

/**
 * Pre-validation Hook: Slug Synchronization
 */
TheatreSchema.pre(
    "validate",
    {document: true, query: false},
    function (this: HydratedDocument<TheatreSchemaFields>, next: () => void): void {
        if (this.isModified("name")) {
            this.slug = generateSlug(this.name);
        }
        next();
    },
);

/**
 * Pre-query Hook: Conditional Virtual Population
 */
TheatreSchema.pre(
    ["find", "findOne", "findOneAndUpdate"],
    {query: true, document: false},
    function (this: Query<any, TheatreSchemaFields>, next: () => void): void {
        const options = this.mongooseOptions();
        const hasVirtuals =
            typeof options.lean === "object" &&
            (options.lean as any).virtuals === true;

        if (hasVirtuals) {
            const currentDate = new Date();

            this.populate([
                {path: "screenCount"},
                {path: "seatCount"},
                {path: "futureShowingCount", match: {startTime: {$gte: currentDate}}},
            ]);
        }
        next();
    },
);

/**
 * Cascading Deletion Logic
 */
const performCascadeCleanup = async (theatreId: any) => {
    if (!theatreId) return;

    await Promise.all([
        TheatreScreenModel.deleteMany({theatre: theatreId}),
        SeatModel.deleteMany({theatre: theatreId}),
        ShowingModel.deleteMany({theatre: theatreId}),
    ]);
};

/**
 * Post-deletion Hook: Document Level
 */
TheatreSchema.post(
    "deleteOne",
    {query: false, document: true},
    async function (this: TheatreSchemaFields) {
        await performCascadeCleanup(this._id);
    },
);

/**
 * Post-deletion Hook: Query Level
 */
TheatreSchema.post(
    ["deleteOne", "deleteMany"],
    {query: true, document: false},
    async function (this: Query<any, TheatreSchemaFields>) {
        const filter = this.getFilter();
        await performCascadeCleanup(filter._id);
    },
);