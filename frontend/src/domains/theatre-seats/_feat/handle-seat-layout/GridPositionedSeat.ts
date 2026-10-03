/**
 * @fileoverview Grid-based seat positioning data structure.
 */

import {ObjectIdString} from "@noovies-tickets/common";

/** Grid-based seat positioning data. */
export type GridPositionedSeat = {
    _id: ObjectIdString;
    row: string;
    x: number;
    y: number;
};