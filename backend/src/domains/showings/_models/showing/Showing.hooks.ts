/**
 * @fileoverview Mongoose middleware for the Showing model lifecycle to handle data synchronization and soft-delete filtering.
 */

import {ShowingSchema} from "./Showing.schema.js";
import {type HydratedDocument, type Query} from "mongoose";
import type {ShowingSchemaFields} from "./Showing.types.js";
import {fetchRequiredModelDocument} from "@/shared/_utils/mongoose/fetchRequiredModelDocument";
import {TheatreModel} from "@/domains/theatres/_models/theatre";
import type {TheatreScreenSchemaFields} from "@/domains/theatre-screens/_models/theatre-screen";
import {ShowingVirtualPopulationPaths} from "@/domains/showings/_feat/query-population";
import {createShowingSeatMap} from "@/domains/seatmaps/_feat/manage-showing-seat-maps";
import {ShowingSeatMapVirtualPipelines} from "@/domains/showings/_feat/query-population/ShowingSeatMapVirtualPipelines";
import {SeatMapModel} from "@/domains/seatmaps/_models/seat-map/SeatMap.model";
import type {MovieSchemaFields} from "@/domains/movies/_models/movie";
import {MovieModel} from "@/domains/movies/_models/movie";
import type {DocumentType} from "@/shared/_types/mongoose/DocumentType";
import {generateSlug} from "@noovies-tickets/common";
import {addShowingExpiryJob} from "@/domains/showings/_feat/showing-redis/service/addShowingExpiryJob";
import {removeShowingExpiryJob} from "@/domains/showings/_feat/showing-redis/service/removeShowingExpiryJob";
import createHttpError from "http-errors";

ShowingSchema.pre("validate", {document: true}, async function () {
    if (this.isModified("theatre")) {
        const theatre = await fetchRequiredModelDocument({
            model: TheatreModel,
            _id: this.theatre,
            notFoundMessage: "Theatre Not Found.",
        });

        this.location = theatre.location;
    }

    let movie: DocumentType<MovieSchemaFields> | undefined;

    if (this.isModified("movie")) {
        movie = await fetchRequiredModelDocument({
            model: MovieModel,
            _id: this.movie,
            notFoundMessage: "Movie Not Found.",
        });

        this.slug = generateSlug(movie.title);
    }
});

ShowingSchema.pre("save", {document: true}, function () {
    (this as any)._wasNew = this.isNew;
});

ShowingSchema.post("save", {document: true}, async function (doc: HydratedDocument<ShowingSchemaFields>) {
    if (!doc._id) {
        return;
    }

    if ((doc as any)._wasNew) {
        await createShowingSeatMap({showingID: doc._id});

        await addShowingExpiryJob({_id: doc._id, job: "start", time: doc.startTime});
        await addShowingExpiryJob({_id: doc._id, job: "complete", time: doc.endTime});

        return;
    }

    try {
        if (doc.isModified("startTime") && doc.status !== "CANCELLED" && doc.status !== "COMPLETED") {
            await removeShowingExpiryJob({_id: doc._id, job: "start"});
            await addShowingExpiryJob({_id: doc._id, job: "start", time: doc.startTime});
        }

        if (doc.isModified("endTime") && doc.status !== "CANCELLED" && doc.status !== "COMPLETED") {
            await removeShowingExpiryJob({_id: doc._id, job: "complete"});
            await addShowingExpiryJob({_id: doc._id, job: "complete", time: doc.endTime});
        }
    } catch (error) {
        throw createHttpError(500, "Showing Updated, But Failed To Update Queue");
    }
});

ShowingSchema.pre(
    ["find", "findOne", "findOneAndUpdate"],
    {document: false, query: true},
    function (this: Query<any, TheatreScreenSchemaFields>, next: () => void) {
        if (!this.mongooseOptions().getSoftDeleted) {
            this.where({isDeleted: false, deletedAt: null});
        }

        const leanOption = this._mongooseOptions.lean;
        const hasVirtuals = (typeof leanOption === "object" && leanOption.virtuals === true) || leanOption === true;

        if (hasVirtuals) {
            this.populate(ShowingVirtualPopulationPaths);
        }

        next();
    },
);

ShowingSchema.pre("aggregate", async function () {
    const {virtuals} = this.options as { virtuals: boolean };
    if (virtuals) this.pipeline().push(...ShowingSeatMapVirtualPipelines);
});

ShowingSchema.post(["deleteOne", "deleteMany"], {document: false, query: true}, async function () {
    const {_id} = this.getFilter();
    if (!_id) return;

    await SeatMapModel.deleteMany({showing: _id});

    try {
        await removeShowingExpiryJob({_id, job: "start"});
        await removeShowingExpiryJob({_id, job: "complete"});
    } catch (error) {
        throw createHttpError(500, "Showing Removed, But Failed To Clear Queue");
    }
});

ShowingSchema.post(
    "deleteOne",
    {document: true, query: false},
    async function (doc: HydratedDocument<ShowingSchemaFields>) {
        if (!doc._id) return;

        await SeatMapModel.deleteMany({showing: doc._id});

        try {
            await removeShowingExpiryJob({_id: doc._id, job: "start"});
            await removeShowingExpiryJob({_id: doc._id, job: "complete"});
        } catch (error) {
            throw createHttpError(500, "Showing Removed, But Failed To Clear Queue");
        }
    }
);