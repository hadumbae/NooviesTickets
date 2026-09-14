/**
 * @fileoverview Repository for fetching administrative view data related to user details.
 */

import {buildURL, handleFetchOperation} from "@/shared/_feat";
import {GetFetchUserDetailsViewDataConfig} from "@/domains/users/_feat/admin-view-data/repository/repository.types.ts";
import {UserAdminViewDataBaseURL} from "@/domains/users/_feat/admin-view-data/repository/baseURL.ts";
import {FetchRequestReturns} from "@/shared/_types";
import {UserDetailsViewData} from "@/domains/users/_feat/admin-view-data/user-details/UserDetailsViewDataSchema.ts";

/** Fetches composite user data including reviews and reservations for the admin detail view. */
export async function getFetchUserDetailsViewData(
    {userID, reviewCount, reservationCount}: GetFetchUserDetailsViewDataConfig
): Promise<FetchRequestReturns<UserDetailsViewData>> {
    const url = buildURL({
        baseURL: UserAdminViewDataBaseURL,
        path: `/details/${userID}`,
        queries: {reviewCount, reservationCount},
    });

    return handleFetchOperation({method: "GET", url});
}