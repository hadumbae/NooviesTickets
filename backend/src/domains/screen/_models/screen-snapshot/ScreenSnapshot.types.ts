/**
 * @fileoverview Immutable field definitions for Screen snapshots.
 * Represents the persistent state of an auditorium used in historical records.
 */

import {Types} from "mongoose";
import type {ScreenType} from "@noovies-tickets/common";

/**
 * Type representing the structure of a Screen snapshot.
 */
export type ScreenSnapshotSchemaFields = {
    theatre: Types.ObjectId;
    name: string;
    screenType: ScreenType;
}