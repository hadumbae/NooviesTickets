/**
 * @fileoverview Service for handling the cancellation workflow of a movie showing document.
 */

import {Types} from "mongoose";
import createHttpError from "http-errors";
import {ShowingModel} from "@/domains/showings/_models/showing/Showing.model";
import type {ShowingSchemaFields} from "@/domains/showings/_models/showing/Showing.types";
import {removeShowingExpiryJob} from "@/domains/showings/_feat/showing-redis/service/removeShowingExpiryJob";

/** Props for the CancelConfig type. */
type CancelConfig = {
    _id: Types.ObjectId,
}

/** Cancels a movie showing document and cleans up associated expiry queue jobs. */
export async function cancelShowing(
    {_id}: CancelConfig
): Promise<ShowingSchemaFields> {
    const oldDoc = await ShowingModel.findById(_id).select("_id status");

    if (!oldDoc) {
        throw createHttpError(404, "404, Not Found!");
    }

    if (oldDoc.status === "RUNNING" || oldDoc.status === "COMPLETED" || oldDoc.status === "CANCELLED") {
        throw createHttpError(409, "409, Invalid Status!");
    }

    const showing = await ShowingModel.findOneAndUpdate(
        {_id, status: {$in: ["SCHEDULED", "SOLD_OUT"]}},
        {status: "CANCELLED"},
        {new: true, runValidators: true},
    );

    if (!showing) {
        throw createHttpError(409, "409, Showing Updated Mid-Cancellation!");
    }

    try {
        await removeShowingExpiryJob({_id, job: "start"});
        await removeShowingExpiryJob({_id, job: "complete"});
    } catch (error: unknown) {
        throw createHttpError(500, "500, Showing Cancelled, Error In Clean Up");
    }

    // # TODO
    // Run Cancellation Job Per Reservation

    return showing;
}