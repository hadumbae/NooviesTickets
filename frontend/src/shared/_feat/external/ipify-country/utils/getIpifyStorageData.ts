/**
 * @fileoverview Provides a utility to retrieve and validate Ipify geolocation data from local storage.
 */

import {parseJSON, ValidationError} from "@noovies-tickets/common";
import {LocalStorageKeys} from "@/shared/_const/storage/LocalStorageKeys.ts";
import {IpifyLocalStorageSchema} from "@/shared/_feat/external/ipify-country/schema/IpifyLocalStorageSchema";

/** Retrieves the Ipify payload from local storage and validates it against the expected schema. */
export function getIpifyStorageData() {
    const itemString = localStorage.getItem(LocalStorageKeys.ipifyCountry);
    if (!itemString) return null;

    const itemValue = parseJSON({
        raw: itemString,
        message: "Failed to parse Ipify payload. Malformed data."
    });

    const {data, success, error} = IpifyLocalStorageSchema.safeParse(itemValue);

    if (!success) {
        throw new ValidationError({
            errorCode: "ERR_DATA_VALIDATION",
            message: "Malformed Ipify Data.",
            errors: error?.errors,
            raw: itemValue,
        });
    }

    return data;
}