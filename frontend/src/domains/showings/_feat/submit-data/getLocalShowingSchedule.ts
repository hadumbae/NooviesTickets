/**
 * @fileoverview Utility for extracting and formatting date and time strings from showing timestamps.
 */

import {IANATimezone, ISO8601DateTime} from "@noovies-tickets/common";

/** Parameters for extracting showing date and time values. */
type ShowingDateTimeParams = {
    startTime: ISO8601DateTime;
    endTime: ISO8601DateTime;
    localTimezone?: IANATimezone;
};

/** Formatted date and time strings for form initialization. */
type ShowingDateTimeReturns = {
    startAtDate: string;
    startAtTime: string;
    endAtDate: string;
    endAtTime: string;
};

/** Converts ISO timestamps into localised date and time strings based on the theatre timezone. */
export function getLocalShowingSchedule(
    {startTime, endTime, localTimezone}: ShowingDateTimeParams
): ShowingDateTimeReturns {
    if (!localTimezone) {
        return {startAtDate: "", startAtTime: "", endAtDate: "", endAtTime: ""};
    }

    const start = startTime.setZone(localTimezone);
    const end = endTime.setZone(localTimezone);

    return {
        startAtDate: start.toFormat("yyyy-MM-dd"),
        startAtTime: start.toFormat("HH:mm"),
        endAtDate: end.toFormat("yyyy-MM-dd"),
        endAtTime: end.toFormat("HH:mm"),
    };
}
