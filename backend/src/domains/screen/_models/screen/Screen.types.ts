/**
 * @fileoverview Field definitions for the Screen entity.
 * Represents a physical auditorium within a cinema complex, defining its
 * technical capabilities and audience capacity.
 */

import {Types} from "mongoose";
import type {TheatreSchemaFields} from "@/domains/theatre/_models/theatre";
import type {ScreenType} from "@noovies-tickets/common";
import type {ShowingWithMovie} from "@/domains/showing/_models/showing/Showing.types";

/**
 * Type representing the structure of a Screen document in MongoDB.
 */
export type ScreenSchemaFields = {
    readonly _id: Types.ObjectId;
    name: string;
    capacity: number;
    screenType: ScreenType;
    theatre: Types.ObjectId | TheatreSchemaFields;
    slug: string;
}

/**
 * Screen entity augmented with populated showings.
 */
export type ScreenWithShowings = ScreenSchemaFields & {
    showings: ShowingWithMovie[];
};