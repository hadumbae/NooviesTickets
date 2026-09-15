/**
 * @fileoverview Mongoose schema definition for immutable TheatreScreen snapshots.
 * Designed for use as a subdocument to preserve the state of an auditorium
 * within historical records like Showings or Reservations.
 */

import {Schema} from "mongoose";
import {TheatreScreenTypeConstant} from "@noovies-tickets/common";
import type {TheatreScreenSnapshotSchemaFields} from "@/domains/theatre-screens/_models/theatre-screen-snapshot/TheatreScreenSnapshot.types.js";

/**
 * Mongoose schema for a TheatreScreen snapshot.
 */
export const TheatreScreenSnapshotSchema = new Schema<TheatreScreenSnapshotSchemaFields>({
    theatre: {
        type: Schema.Types.ObjectId,
        ref: "Theatre",
        required: [true, "Theatre is required."],
    },

    name: {
        type: String,
        maxLength: [255, "Name must be 255 characters or less."],
        required: [true, "TheatreScreen name is required for snapshots."],
    },

    screenType: {
        type: String,
        enum: {
            values: TheatreScreenTypeConstant,
            message: "{VALUE} is not a valid TheatreScreen Type.",
        },
        required: [true, "TheatreScreen Type is required."],
    },
}, {_id: false, timestamps: false});