/**
 * @fileoverview Validation schema for TheatreScreen entity input data.
 * Enforces business rules for cinema auditorium configuration, including
 * physical capacity limits and technological classification.
 */

import {z} from "zod";
import {TheatreScreenTypeSchema} from "@noovies-tickets/common";
import {PositiveNumberSchema, NonEmptyStringSchema} from "@noovies-tickets/common";
import {ObjectIdSchema} from "@/shared/_schema/mongoose/ObjectIdSchema";

/**
 * Zod schema for validating TheatreScreen creation and update payloads.
 */
export const TheatreScreenInputSchema = z.object({
    name: NonEmptyStringSchema.max(255, "Name must be 255 characters or less."),
    capacity: PositiveNumberSchema.gt(0, "Capacity must be greater than 0"),
    screenType: TheatreScreenTypeSchema,
    theatre: ObjectIdSchema,
});

/**
 * TypeScript type representing the validated input data for a TheatreScreen.
 */
export type TheatreScreenInputData = z.infer<typeof TheatreScreenInputSchema>;