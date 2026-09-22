/**
 * @fileoverview Mongoose model for cinema screens.
 * Orchestrates the registration of the TheatreScreen schema, integrating virtuals,
 * middleware hooks, and database indexes.
 */

import {Model, model} from "mongoose";
import type {TheatreScreenSchemaFields} from "./TheatreScreen.types";
import {TheatreScreenSchema} from "./TheatreScreen.schema";

import "./TheatreScreen.virtuals";
import "./TheatreScreen.hooks";
import "./TheatreScreen.indexes";

/**
 * The TheatreScreen Model.
 */
export const TheatreScreenModel: Model<TheatreScreenSchemaFields> = model<TheatreScreenSchemaFields>("TheatreScreen", TheatreScreenSchema);
