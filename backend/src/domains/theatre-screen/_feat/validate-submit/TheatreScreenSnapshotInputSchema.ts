/**
 * @fileoverview Validation schema for TheatreScreen snapshot data.
 * Ensures the integrity of immutable screen records embedded within historical documents.
 */

import {z} from "zod";
import {ObjectIdSchema} from "@/shared/_schema/mongoose/ObjectIdSchema";
import {NonEmptyStringSchema} from "@noovies-tickets/common";
import {TheatreScreenTypeSchema} from "@noovies-tickets/common";

/**
 * Zod schema for validating the payload used to create a TheatreScreen snapshot.
 */
export const TheatreScreenSnapshotInputSchema = z.object({
    theatre: ObjectIdSchema,
    screenType: TheatreScreenTypeSchema,
    name: NonEmptyStringSchema.max(255, "Name must be 255 characters or less."),
});

/**
 * TypeScript type inferred from TheatreScreenSnapshotInputSchema.
 */
export type TheatreScreenSnapshotInputData = z.infer<typeof TheatreScreenSnapshotInputSchema>;