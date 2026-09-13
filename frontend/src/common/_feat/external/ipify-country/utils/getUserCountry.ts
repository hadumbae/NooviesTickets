/**
 * @fileoverview Utility for resolving the user's country code using IP location data.
 */

import {ISO3166Alpha2CountryCode} from "@noovies-tickets/common";
import {getIpifyStorageData} from "@/common/_feat/external/ipify-country/utils/getIpifyStorageData.ts";

type CountryConfig = {
    presetCountry?: ISO3166Alpha2CountryCode;
    defaultCountry?: ISO3166Alpha2CountryCode;
}

/** Resolves the user's ISO country code from IP location payload with a fallback default. */
export function getUserCountry({presetCountry, defaultCountry = "US"}: CountryConfig = {}) {
    const data = getIpifyStorageData();
    return presetCountry || data?.payload?.location.country || defaultCountry;
}