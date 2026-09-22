/**
 * @fileoverview Typing for data associated with client-side screen view data.
 */

import {ObjectIdString, DateOnlyString, SlugString} from "@noovies-tickets/common";

/** Parameters for fetching screens with showings by theatre and date. */
export type FetchTheatreScreensWithShowingsConfig = {
    theatreID: ObjectIdString | SlugString;
    localDate: DateOnlyString;
};