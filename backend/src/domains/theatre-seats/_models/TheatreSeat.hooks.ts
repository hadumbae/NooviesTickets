/**
 * @fileoverview Mongoose middleware for the TheatreSeat schema to manage slug lifecycle.
 */

import type { HydratedDocument } from "mongoose";
import {generateSlug} from "@noovies-tickets/common";
import { TheatreSeatSchema } from "./TheatreSeat.schema.js";
import type {TheatreSeatSchemaFields} from "@/domains/theatre-seats/_models/TheatreSeat.types";

/**
 * Pre-validation hook for TheatreSeat documents.
 */
TheatreSeatSchema.pre(
    "validate",
    { document: true, query: false },
    function (this: HydratedDocument<TheatreSeatSchemaFields>, next: () => void): void {
        if (this.isModified("layoutType")) {
            this.slug = generateSlug(this.layoutType);
        }

        next();
    },
);
