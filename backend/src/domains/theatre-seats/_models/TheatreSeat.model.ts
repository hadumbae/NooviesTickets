/**
 * @fileoverview Mongoose model for the TheatreSeat entity.
 */

import { model, Model } from "mongoose";
import { TheatreSeatSchema } from "./TheatreSeat.schema.js";

import "./TheatreSeat.indexes";
import "./TheatreSeat.hooks";
import type {TheatreSeatSchemaFields} from "@/domains/theatre-seats/_models/TheatreSeat.types";

/**
 * Model representing a seat or grid element within a theatre screen.
 */
export const TheatreSeatModel: Model<TheatreSeatSchemaFields> = model<TheatreSeatSchemaFields>("TheatreSeat", TheatreSeatSchema);
