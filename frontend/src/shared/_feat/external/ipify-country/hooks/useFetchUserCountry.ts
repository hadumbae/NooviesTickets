/**
 * @fileoverview Hook for managing and persisting user country data from the Ipify API.
 */

import {useEffect} from "react";
import {UseQueryResult} from "@tanstack/react-query";
import {HttpResponseError} from "@noovies-tickets/common";
import {IpifyLocalStorageData, IpifyPayloadSchema} from "@/shared/_feat/external/ipify-country/schema";
import {useFetchIPGeolocationData} from "@/shared/_feat/external/ipify-country/hooks/useFetchIPGeolocationData.ts";
import {useGetIpifyLocalStorageData} from "@/shared/_feat/external/ipify-country/hooks/useGetIpifyLocalStorageData.ts";

/** Result object containing the stored country data and the active query state. */
type CountryReturns = {
    storedData: IpifyLocalStorageData;
    query: UseQueryResult<unknown, HttpResponseError>;
}

/**
 * Orchestrates fetching user geolocation data and synchronizing it with local storage.
 */
export function useFetchUserCountry(): CountryReturns {
    const {fetched, setFetched, payload, setPayload} = useGetIpifyLocalStorageData();

    const query = useFetchIPGeolocationData({options: {enabled: !fetched}});

    useEffect(() => {
        if (query.isSuccess && query.data) {
            const {success, data} = IpifyPayloadSchema.safeParse(query.data);

            if (success) {
                setFetched(true);
                setPayload(data);
            } else {
                setFetched(true);
                setPayload(null);
            }
        }

        if (query.isError) {
            setFetched(true);
            setPayload(null);
        }
    }, [query.isSuccess, query.isError, query.data, setFetched, setPayload]);

    return {
        storedData: {fetched, payload},
        query,
    }
}