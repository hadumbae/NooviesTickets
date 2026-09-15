/**
 * @fileoverview Mongoose model for reserved seat snapshots.
 */

import {model, type Model} from "mongoose";
import {ReservedSeatSnapshotSchema} from "@/domains/seatmaps/_models/seat-map-snapshot/ReservedSeatSnapshot.schema.js";
import type {ReservedSeatSnapshotSchemaFields} from "@/domains/seatmaps/_models/seat-map-snapshot/ReservedSeatSnapshot.types.js";

/** Mongoose model for the ReservedSeatSnapshot collection. */
export const ReservedSeatSnapshotModel: Model<ReservedSeatSnapshotSchemaFields> =
    model<ReservedSeatSnapshotSchemaFields>("ReservedSeatSnapshot", ReservedSeatSnapshotSchema);
