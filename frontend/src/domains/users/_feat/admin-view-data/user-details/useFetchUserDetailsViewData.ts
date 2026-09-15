/**
 * @fileoverview Hook for fetching and validating composite user data for the admin details view.
 */

import {ObjectIdString} from "@noovies-tickets/common";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/shared/_err/HttpResponseError.ts";
import {buildQueryFn, useQueryOptionsDefaults} from "@/shared/_feat";
import {FetchQueryOptions} from "@/shared/_types";
import {getFetchUserDetailsViewData} from "@/domains/users/_feat/admin-view-data/repository/repository.ts";
import {UserAdminViewDataQueryKeys} from "@/domains/users/_feat/admin-view-data/queryKeys.ts";
import {
    UserDetailsViewData,
    UserDetailsViewDataSchema
} from "@/domains/users/_feat/admin-view-data/user-details/UserDetailsViewDataSchema.ts";

/** Configuration for fetching user details view data. */
export type FetchConfig = {
    userID: ObjectIdString;
    reviewCount?: number;
    reservationCount?: number;
    options?: FetchQueryOptions<UserDetailsViewData>;
}

/** Fetches and validates the data required for the User Details admin interface. */
export function useFetchUserDetailsViewData(
    {userID, reviewCount, reservationCount, options}: FetchConfig
): UseQueryResult<UserDetailsViewData, HttpResponseError> {
    const fetchUserDetails = buildQueryFn<UserDetailsViewData>({
        action: () => getFetchUserDetailsViewData({userID, reviewCount, reservationCount}),
        schema: UserDetailsViewDataSchema,
    });

    return useQuery({
        queryKey: UserAdminViewDataQueryKeys.userDetails(),
        queryFn: fetchUserDetails,
        ...useQueryOptionsDefaults(options),
    });
}