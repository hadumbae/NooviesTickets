/**
 * @fileoverview Defines the Mongoose model for snapshots of showing data at the time of reservation.
 */

import { type Model, model } from "mongoose";
import { ReservedShowingSnapshotSchema } from "@/domains/reservations/_models/showing-snapshot/ReservedShowingSnapshot.schema.js";
import type { ReservedShowingSnapshotSchemaFields } from "@/domains/reservations/_models/showing-snapshot/ReservedShowingSnapshot.types.js";

import "@/domains/reservations/_models/showing-snapshot/ReservedShowingSnapshot.hooks.js";

/** Mongoose model for the ReservedShowingSnapshot collection. */
export const ReservedShowingSnapshotModel: Model<ReservedShowingSnapshotSchemaFields> =
    model<ReservedShowingSnapshotSchemaFields>(
        "ReservedShowingSnapshot",
        ReservedShowingSnapshotSchema
    );
