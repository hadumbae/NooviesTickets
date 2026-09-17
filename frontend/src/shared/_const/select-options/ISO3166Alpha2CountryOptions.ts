/**
 * @fileoverview Provides select options for ISO 3166-1 alpha-2 country codes.
 */

import {ReactSelectOption} from "@/shared/_types/input/ReactSelectOption.ts";
import {ISO3166Alpha2CodeConstant, ISO3166Alpha2CountryLabelMap} from "@noovies-tickets/common";

/** Array of select options mapping ISO 3166-1 alpha-2 codes to their country names. */
export const ISO3166Alpha2CountryOptions = ISO3166Alpha2CodeConstant.map((code): ReactSelectOption => ({
    value: code,
    label: ISO3166Alpha2CountryLabelMap[code],
}));