/**
 * @fileoverview Index definitions for the TheatreScreen schema.
 * Enforces data integrity and optimizes query performance for relational lookups.
 */

import {TheatreScreenSchema} from "@/domains/theatre-screens/_models/theatre-screen/TheatreScreen.schema";

/**
 * Compound Unique Index: theatre + slug
 */
TheatreScreenSchema.index(
    {theatre: 1, slug: 1},
    {unique: true, name: "idx_unique_theatre_screen_slug"}
);