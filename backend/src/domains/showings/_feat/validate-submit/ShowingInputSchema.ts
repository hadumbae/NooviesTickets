/**
 * @fileoverview Zod schema for validating and transforming showing submission data.
 */

import {z} from "zod";
import {DateTime} from "luxon";
import {NonEmptyStringSchema, PositiveNumberSchema, DateOnlyStringSchema, TimeStringSchema, IANATimezoneSchema, ShowingStatusSchema} from "@noovies-tickets/common";
import {ShowingConfigInputSchema} from "@/domains/showings/_feat/validate-submit/ShowingConfigInputSchema";
import {ObjectIdSchema} from "@/shared/_schema/mongoose/ObjectIdSchema";

/** Schema for validating showing input and transforming date strings into UTC JS Dates. */
export const ShowingInputSchema = z.object({
    startAtDate: DateOnlyStringSchema,
    startAtTime: TimeStringSchema,

    endAtDate: DateOnlyStringSchema,
    endAtTime: TimeStringSchema,
    timezone: IANATimezoneSchema,

    ticketPrice: PositiveNumberSchema,

    language: NonEmptyStringSchema,

    subtitleLanguages: z
        .array(NonEmptyStringSchema)
        .nonempty({message: "Must not be empty."}),

    movie: ObjectIdSchema,
    theatre: ObjectIdSchema,
    screen: ObjectIdSchema,

    status: ShowingStatusSchema,

    config: ShowingConfigInputSchema,
}).superRefine((values, ctx) => {
    const {startAtDate, startAtTime, endAtDate, endAtTime} = values;

    const start = DateTime.fromISO(`${startAtDate}T${startAtTime}`);
    const end = DateTime.fromISO(`${endAtDate}T${endAtTime}`);

    if (end < start) {
        const message = "Ending time cannot be earlier than starting time.";

        ctx.addIssue({
            code: "custom",
            path: ["endAtDate"],
            message,
        });

        ctx.addIssue({
            code: "custom",
            path: ["endAtTime"],
            message,
        });
    }
}).transform(({startAtTime, startAtDate, endAtTime, endAtDate, timezone, ...values}) => {
    const startTime = DateTime
        .fromISO(`${startAtDate}T${startAtTime}`, {zone: timezone})
        .toUTC()
        .toJSDate();

    const endTime = DateTime
        .fromISO(`${endAtDate}T${endAtTime}`, {zone: timezone})
        .toUTC()
        .toJSDate();

    return {
        ...values,
        timezone,
        startTime,
        endTime,
    }
});

/** Input type derived from the ShowingInputSchema. */
export type ShowingInput = z.infer<typeof ShowingInputSchema>;