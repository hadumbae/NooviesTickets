/**
 * @file calculateDateNow.ts
 *
 * UTC-safe date utility helper built on Luxon.
 */

import {DateTime} from "luxon";

/**
 * Returns the current date-time normalized to UTC.
 *
 * @description
 * Wraps `DateTime.now()` to ensure consistent UTC normalization before
 * converting to a native JavaScript `Date`.
 *
 * @returns A `Date` instance representing the current moment in UTC
 *
 * @remarks
 * - Equivalent to "now" in absolute time.
 * - Safe for persistence (e.g., `createdAt`, `updatedAt`, lifecycle fields).
 * - Prevents accidental reliance on system-local timezone offsets.
 */
export function calculateDateNow(): Date {
    return DateTime
        .now()
        .toUTC()
        .toJSDate();
}
