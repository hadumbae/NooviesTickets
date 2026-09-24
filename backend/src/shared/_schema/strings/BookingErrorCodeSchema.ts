/**
 * @fileoverview Zod schema definitions and types for booking-related error codes.
 */

import {z} from "zod";

/** List of supported booking error code literals. */
export const BOOKING_ERROR_CODES = [
    "ERR_SCREEN_FULL",
    "ERR_SHOWING_CANCELLED",
    "ERR_SEAT_RESERVED",
    "ERR_INVALID_RESERVATION",
    "ERR_INVALID_RESERVATION_TYPE",
    "ERR_RESERVATION_NOT_FOUND",
    "ERR_UNAUTHORIZED",
    "ERR_RESERVATION_EXPIRED",
    "ERR_LIFECYCLE_QUEUE_FAILED",
    "ERR_UNKNOWN_ERROR",
] as const;

/** Schema for validating booking error code values with custom error messages. */
export const BookingErrorCodeSchema = z.enum(
    BOOKING_ERROR_CODES,
    {
        errorMap: (issue, ctx) => {
            if (issue.code === z.ZodIssueCode.invalid_enum_value) {
                return {message: "Invalid value."};
            }

            if (issue.code === z.ZodIssueCode.invalid_type) {
                return {message: "Must be a valid string."};
            }

            return {message: ctx.defaultError};
        },
    }
);

/** Parsed type representation for booking error codes. */
export type BookingErrorCode = z.infer<typeof BookingErrorCodeSchema>;