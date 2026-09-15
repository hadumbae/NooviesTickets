/**
 * @file TheatreScreen.middleware.ts
 *
 * @summary
 * Mongoose middleware for the TheatreScreen model.
 *
 * @description
 * Responsibilities include:
 * - Automatic slug generation
 * - Conditional population of virtual fields on lean queries
 * - Cascading cleanup of dependent entities on deletion
 */

import { TheatreScreenSchema } from "./TheatreScreen.schema";
import type { HydratedDocument, Query } from "mongoose";
import type { TheatreScreenSchemaFields } from "./TheatreScreen.types";

import {ShowingModel} from "@/domains/showing/_models/showing/Showing.model";
import {generateSlug} from "@noovies-tickets/common";
import {TheatreModel} from "@/domains/theatre/_models/theatre";
import {SeatModel} from "@/domains/seat/_models";

/**
 * Document-level validation hook.
 *
 * @description
 * Regenerates the screen slug whenever the screen name changes.
 */
TheatreScreenSchema.pre(
    "validate",
    { document: true, query: false },
    function (this: HydratedDocument<TheatreScreenSchemaFields>, next: () => void): void {
        if (this.isModified("name")) {
            this.slug = generateSlug(this.name);
        }

        next();
    },
);

/**
 * Query middleware for auto-populating screen virtuals.
 *
 * @description
 * Automatically populates computed virtual fields only when:
 * - `lean()` is enabled
 * - `lean({ virtuals: true })` is explicitly requested
 *
 * Prevents unnecessary population overhead for standard queries.
 */
TheatreScreenSchema.pre(
    ["find", "findOne", "findOneAndUpdate"],
    { document: false, query: true },
    function (this: Query<any, TheatreScreenSchemaFields>, next: () => void) {
        const currentDate = new Date();

        const hasVirtuals =
            typeof this._mongooseOptions.lean === "object" &&
            this._mongooseOptions.lean.virtuals === true;

        if (hasVirtuals) {
            this.populate([
                { path: "seatCount" },
                {
                    path: "futureShowingCount",
                    match: { startTime: { $gte: currentDate } },
                },
            ]);
        }

        next();
    },
);

/**
 * Document-level delete hook.
 *
 * @description
 * Cascades deletion to all dependent entities when a single
 * screen document is deleted.
 */
TheatreScreenSchema.post(
    "deleteOne",
    { document: true, query: false },
    async function (this: HydratedDocument<TheatreScreenSchemaFields>) {
        await Promise.all([
            TheatreModel.updateMany(
                { screens: this._id },
                { $pull: { screens: this._id } },
            ),
            SeatModel.deleteMany({ screen: this._id }),
            ShowingModel.deleteMany({ screen: this._id }),
        ]);
    },
);

/**
 * Query-level delete hook.
 *
 * @description
 * Ensures referential integrity when screens are deleted
 * via query-based operations.
 */
TheatreScreenSchema.post(
    ["deleteOne", "deleteMany"],
    { document: false, query: true },
    async function (this: Query<any, TheatreScreenSchemaFields>) {
        const { _id } = this.getFilter();
        if (!_id) return;

        await Promise.all([
            TheatreModel.updateMany(
                { screens: _id },
                { $pull: { screens: _id } },
            ),
            SeatModel.deleteMany({ screen: _id }),
            ShowingModel.deleteMany({ screen: _id }),
        ]);
    },
);
