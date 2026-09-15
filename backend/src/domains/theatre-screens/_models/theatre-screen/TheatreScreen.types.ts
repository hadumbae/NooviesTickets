/**
 * @fileoverview Field definitions for the TheatreScreen entity.
 * Represents a physical auditorium within a cinema complex, defining its
 * technical capabilities and audience capacity.
 */

import {Types} from "mongoose";
import type {TheatreSchemaFields} from "@/domains/theatres/_models/theatre";
import type {TheatreScreenType} from "@noovies-tickets/common";
import type {ShowingWithMovie} from "@/domains/showings/_models/showing/Showing.types";

/**
 * Type representing the structure of a TheatreScreen document in MongoDB.
 */
export type TheatreScreenSchemaFields = {
    readonly _id: Types.ObjectId;
    name: string;
    capacity: number;
    screenType: TheatreScreenType;
    theatre: Types.ObjectId | TheatreSchemaFields;
    slug: string;
}

/**
 * TheatreScreen entity augmented with populated showings.
 */
export type TheatreScreenWithShowings = TheatreScreenSchemaFields & {
    showings: ShowingWithMovie[];
};