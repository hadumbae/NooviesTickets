/**
 * @file calculateFutureDate.ts
 *
 * UTC-safe date utility helper built on Luxon.
 */

import {DateTime, type DurationLike} from "luxon";

/**
 * Calculates a future UTC date-time relative to the current moment.
 *
 * @description
 * Adds a Luxon `DurationLike` object to the current UTC time and
 * returns the resulting value as a native JavaScript `Date`.
 *
 * @param duration - A Luxon-compatible duration object
 * (e.g. `{ minutes: 15 }`, `{ hours: 2 }`, `{ days: 1 }`)
 *
 * @returns A `Date` instance representing the computed future moment in UTC
 *
 * @remarks
 * - The calculation is always relative to the current moment.
 * - Result is normalized to UTC before conversion.
 * - Suitable for expiration timestamps, deadlines, token lifetimes, and scheduling.
 */
export function calculateFutureDate(duration: DurationLike): Date {
    return DateTime
        .now()
        .toUTC()
        .plus(duration)
        .toJSDate();
}
