/**
 * @fileoverview Defines the schema fields for a snapshot of a reserved seat within a seat map.
 */

import { Types } from "mongoose";
import type { TheatreSeatType } from "@noovies-tickets/common";

/** Schema fields for the ReservedSeatSnapshot model. */
export type ReservedSeatSnapshotSchemaFields = {
    seatMap: Types.ObjectId;
    seatIdentifier: string;
    seatType: TheatreSeatType;
    seatLabel?: string;
    pricePaid: number;
}
