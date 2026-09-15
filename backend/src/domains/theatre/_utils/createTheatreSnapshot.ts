/**
 * @fileoverview Utility function for creating immutable snapshots of theatre documents for audit and historical tracking.
 */

import {Types} from "mongoose";
import {TheatreSnapshotInputSchema} from "@/domains/theatre/_validation/TheatreSnapshotInputSchema";
import {InconsistentDataError} from "@/shared/_errors/InconsistentDataError";
import {DocumentNotFoundError} from "@/shared/_errors/DocumentNotFoundError";
import {TheatreModel} from "@/domains/theatre/_models/theatre";
import {TheatreSnapshotModel, type TheatreSnapshotSchemaFields} from "@/domains/theatre/_models/theatre-snapshot";

/** Creates an immutable validated snapshot of a theatre at a specific point in time. */
export async function createTheatreSnapshot(
    theatreID: Types.ObjectId
): Promise<TheatreSnapshotSchemaFields> {
    const theatre = await TheatreModel.findById(theatreID).lean();

    if (!theatre) {
        throw new DocumentNotFoundError({
            model: TheatreModel,
            identifier: theatreID,
            message: "Failed to fetch theatre for snapshot.",
        });
    }

    const {name, location} = theatre;
    const {data, success, error} = TheatreSnapshotInputSchema.safeParse({name, ...location});

    if (!success) {
        throw new InconsistentDataError({
            modelName: TheatreSnapshotModel.name,
            message: "Inconsistent data, unable to create snapshot.",
            errors: error?.errors,
        });
    }

    return data;
}