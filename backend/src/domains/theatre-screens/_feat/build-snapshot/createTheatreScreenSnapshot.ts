/**
 * @fileoverview Logic for generating validated screen snapshots from existing screen documents.
 */

import {Types} from "mongoose";
import type {TheatreScreenSnapshotSchemaFields} from "@/domains/theatre-screens/_models/theatre-screen-snapshot/TheatreScreenSnapshot.types";
import {TheatreScreenModel} from "@/domains/theatre-screens/_models/theatre-screen";
import {DocumentNotFoundError} from "@/shared/_errors/DocumentNotFoundError";
import {InconsistentDataError} from "@/shared/_errors/InconsistentDataError";
import {TheatreScreenSnapshotInputSchema} from "@/domains/theatre-screens/_feat/validate-submit";
import {TheatreScreenSnapshotModel} from "@/domains/theatre-screens/_models/theatre-screen-snapshot";

/** Fetches a screen by ID and validates its data to create a snapshot object. */
export async function createTheatreScreenSnapshot(
    screenID: Types.ObjectId
): Promise<TheatreScreenSnapshotSchemaFields> {
    const screen = await TheatreScreenModel.findById(screenID).lean();

    if (!screen) {
        throw new DocumentNotFoundError({
            model: TheatreScreenModel,
            identifier: screenID,
            message: "Failed to fetch screen for snapshot.",
        });
    }

    const {data, success} = TheatreScreenSnapshotInputSchema.safeParse({
        theatre: screen.theatre,
        screenType: screen.screenType,
        name: screen.name,
    });

    if (!success) {
        throw new InconsistentDataError({
            modelName: TheatreScreenSnapshotModel.name,
            message: "Source screen data is inconsistent; snapshot generation aborted.",
        });
    }

    return data;
}