/**
 * @fileoverview Defines the Mongoose model for seat map documents.
 */

import {model, Model} from "mongoose";
import {SeatMapSchema} from "@/domains/seatmaps/_models/seat-map/SeatMap.schema.js";
import type {SeatMapSchemaFields} from "@/domains/seatmaps/_models/seat-map/SeatMap.types.js";

import "@/domains/seatmaps/_models/seat-map/SeatMap.virtuals.js";
import "@/domains/seatmaps/_models/seat-map/SeatMap.hooks.js";

/** Mongoose model for interacting with the SeatMap collection. */
export const SeatMapModel: Model<SeatMapSchemaFields> = model<SeatMapSchemaFields>("SeatMap", SeatMapSchema);
