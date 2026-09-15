/**
 * @fileoverview Immutable field definitions for TheatreScreen snapshots.
 * Represents the persistent state of an auditorium used in historical records.
 */

import {Types} from "mongoose";
import type {TheatreScreenType} from "@noovies-tickets/common";

/**
 * Type representing the structure of a TheatreScreen snapshot.
 */
export type TheatreScreenSnapshotSchemaFields = {
    theatre: Types.ObjectId;
    name: string;
    screenType: TheatreScreenType;
}