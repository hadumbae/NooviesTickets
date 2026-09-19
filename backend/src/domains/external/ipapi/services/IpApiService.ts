/**
 * @fileoverview Service for retrieving and validating IP geolocation data from the Ipify API.
 */

import "dotenv/config";
import {useFetchAPI} from "@/shared/_utils/fetch/useFetchAPI.js";
import * as process from "node:process";
import {type IpifyCountryData, IpifyCountryDataSchema} from "@/domains/external/ipapi/schema/IpifyCountryDataSchema.js";
import {ValidationError} from "@noovies-tickets/common";

/** Fetches and validates IP geolocation data from the Ipify service. */
export const fetchIPData = async (ipAddress: string): Promise<IpifyCountryData> => {
    const url = `https://geo.ipify.org/api/v2/country?apiKey=${process.env.IPIFY_KEY}&ipAddress=${ipAddress}`;

    const fetchedData = await useFetchAPI({
        url,
        method: "GET",
    });

    const {data, success, error} = IpifyCountryDataSchema.safeParse(fetchedData);

    if (!success) {
        throw new ValidationError({
            errorCode: "ERR_DATA_VALIDATION",
            message: "Invalid Country Data.",
            raw: fetchedData,
            errors: error.errors,
            statusCode: 500,
        });
    }

    return data;
};