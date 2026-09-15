/**
 * @fileoverview Mongoose schema definition for the TheatreScreen entity.
 * Defines the persistent data structure and validation rules for physical cinema auditoriums.
 */

import {Schema} from "mongoose";
import type {TheatreScreenSchemaFields} from "./TheatreScreen.types";
import {SlugSchemaTypeOptions} from "@/shared/_models/SlugSchemaTypeOptions";
import {TheatreScreenTypeConstant} from "@noovies-tickets/common";

/**
 * Mongoose schema for a TheatreScreen.
 */
export const TheatreScreenSchema = new Schema<TheatreScreenSchemaFields>(
    {
        name: {
            type: String,
            trim: true,
            maxLength: [255, "Name must be 255 characters or less."],
            required: [true, "TheatreScreen name is required."],
        },

        theatre: {
            type: Schema.Types.ObjectId,
            ref: "Theatre",
            required: [true, "Theatre is required."],
            index: true,
        },

        capacity: {
            type: Number,
            min: [1, "Capacity must be at least 1."],
            required: [true, "Capacity is required."],
        },

        screenType: {
            type: String,
            enum: {
                values: TheatreScreenTypeConstant,
                message: "{VALUE} is not a supported TheatreScreen Type.",
            },
            default: "2D",
            required: [true, "TheatreScreen Type is required."],
        },

        slug: SlugSchemaTypeOptions,
    },
    {
        timestamps: true,
    },
);