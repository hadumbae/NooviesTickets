/**
 * @fileoverview Hook for fetching geolocation data based on the client's IP address.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {fetchGeolocationByIP} from "@/shared/_feat/external/repository/repository.ts";
import {FetchQueryOptions} from "@/shared/_types/fetch-queries/FetchQueryOptions.ts";
import {useQueryOptionDefaults} from "@/shared/_feat/handle-query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/shared/_err/HttpResponseError.ts";

type FetchParams = {
    options?: FetchQueryOptions<unknown>;
};

/** Hook that retrieves geolocation information based on the user's current IP address. */
export function useFetchIPGeolocationData(
    {options}: FetchParams = {}
): UseQueryResult<unknown, HttpResponseError> {
    const fetchIpData = async () => {
        const {result} = await fetchGeolocationByIP();
        return result;
    }

    return useQuery({
        queryKey: ["api", "external", "ip-geolocation", "data"],
        queryFn: fetchIpData,
        ...useQueryOptionDefaults(options),
    });
}