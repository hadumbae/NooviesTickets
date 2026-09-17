/**
 * @fileoverview Formatter utility for transforming raw location data into displayable address strings.
 */

import {Location, ISO3166Alpha2CountryLabelMap} from "@noovies-tickets/common";

/** Formats a location object into a structured address with a human-readable country name. */
export function formatLocationDetails(location: Location) {
    const {country, state, city, street, timezone, postalCode} = location;

    const countryName = ISO3166Alpha2CountryLabelMap[country];

    const address = [street, city, state, countryName]
        .filter(v => !!v)
        .join(", ");

    return {
        street,
        city,
        state,
        country,
        postalCode,
        timezone,
        address,
        countryName,
        location,
    };
}
