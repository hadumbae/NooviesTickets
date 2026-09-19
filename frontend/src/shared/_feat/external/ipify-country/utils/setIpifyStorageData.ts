/**
 * @fileoverview Utility for persisting Ipify geolocation data to local storage.
 */

import {ValidationError} from "@noovies-tickets/common";
import {LocalStorageKeys} from "@/shared/_const/storage/LocalStorageKeys.ts";
import {
    IpifyLocalStorageData,
    IpifyLocalStorageSchema
} from "@/shared/_feat/external/ipify-country/schema/IpifyLocalStorageSchema";

/** Validates and saves Ipify payload data to local storage or removes it if null. */
export function setIpifyStorageData(value: IpifyLocalStorageData | null): void {
    if (!value) {
        localStorage.removeItem(LocalStorageKeys.ipifyCountry);
    }

    const {success, data, error} = IpifyLocalStorageSchema.safeParse(value);

    if (!success) {
        throw new ValidationError({
            errorCode: "ERR_DATA_VALIDATION",
            message: "Invalid Ipify Data Input.",
            errors: error?.errors,
            raw: value,
        });
    }

    localStorage.setItem(LocalStorageKeys.ipifyCountry, JSON.stringify(data));
}