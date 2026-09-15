/**
 * @fileoverview Defines the Mongoose model for screen snapshots.
 */

import { model, type Model } from "mongoose";
import { TheatreScreenSnapshotSchema } from "@/domains/theatre-screen/_models/theatre-screen-snapshot/TheatreScreenSnapshot.schema.js";
import type { TheatreScreenSnapshotSchemaFields } from "@/domains/theatre-screen/_models/theatre-screen-snapshot/TheatreScreenSnapshot.types.js";

/** Mongoose model for the TheatreScreenSnapshot collection. */
export const TheatreScreenSnapshotModel: Model<TheatreScreenSnapshotSchemaFields> =
    model<TheatreScreenSnapshotSchemaFields>(
        "ScreenSnapshot",
        TheatreScreenSnapshotSchema
    );
