/**
 * @fileoverview Repository for fetching customer profile data for administrative views.
 */

import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns.ts"
import {handleFetchOperation} from "@/common/_feat/use-fetch-api/handleFetchOperation.ts"
import {CustomerProfileOverviewBaseURL} from "@/domains/customers/_feat/profile-overview/repository/baseURL";
import {
    GetFetchCustomerProfileViewDataConfig
} from "@/domains/customers/_feat/profile-overview/repository/repository.types";
import {buildURL} from "@/common/_feat/fetch-api";
import {CustomerProfileViewData} from "@/domains/customers/_feat/profile-overview/schema/viewDataSchema.ts";

/**
 * Fetches the complete profile view for a specific customer.
 */
export function getFetchCustomerProfileViewData(
    {customerID}: GetFetchCustomerProfileViewDataConfig
): Promise<FetchRequestReturns<CustomerProfileViewData>> {
    const url = buildURL({
        baseURL: CustomerProfileOverviewBaseURL,
        path: `/customer/${customerID}`,
    })

    return handleFetchOperation({method: "GET", url})
}