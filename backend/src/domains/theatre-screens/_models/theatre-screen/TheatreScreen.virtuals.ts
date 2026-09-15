/**
 * @fileoverview Virtual field definitions and plugin configurations for the TheatreScreen schema.
 * Provides computed relationships for inventory and scheduling without persisting
 * redundant data in MongoDB.
 */

import {TheatreScreenSchema} from "./TheatreScreen.schema";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

/**
 * Virtual: futureShowingCount
 */
TheatreScreenSchema.virtual("futureShowingCount", {
    ref: "Showing",
    localField: "_id",
    foreignField: "screen",
    count: true,
    match: {
        status: {$in: ["SCHEDULED", "SOLD_OUT"]},
        startTime: {$gte: new Date()},
    },
});

/**
 * Virtual: seatCount
 */
TheatreScreenSchema.virtual("seatCount", {
    ref: "Seat",
    localField: "_id",
    foreignField: "screen",
    count: true,
});

/**
 * Plugin: mongoose-lean-virtuals
 */
TheatreScreenSchema.plugin(mongooseLeanVirtuals);