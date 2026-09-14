/** @fileoverview Type definition for location form values. */

import {CoordinateFormStarterValues} from "@/shared/_models/coordinate-form";

/** Form values for location and address data. */
export type LocationFormStarterValues = {
    street: any;
    city: any;
    state: any;
    country: any;
    postalCode: any;
    timezone: any;
    includeCoordinates: any;
    coordinates: CoordinateFormStarterValues;
};