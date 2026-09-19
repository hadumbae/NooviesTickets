/**
 * @fileoverview Hook for fetching a list of users with validation and query options.
 */

import {ListQueryConfig} from "@/shared/_types";
import {UserQueryOptions} from "@/domains/users/_schema/query-options";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {HttpResponseError} from "@noovies-tickets/common";
import {buildQueryFn, useQueryOptionsDefaults} from "@/shared/_feat";
import {find} from "@/domains/users/_feat/crud";
import {UserCRUDQueryKeys} from "@/domains/users/_feat/crud-hooks/keys";

/** Fetches a paginated or filtered list of users from the API. */
export function useFetchUsers<TData = unknown>(
    {queries, schema, options, config}: ListQueryConfig<TData, UserQueryOptions>
): UseQueryResult<TData, HttpResponseError> {
    const fetchUsers = buildQueryFn<TData>({
        action: () => find({queries, config}),
        schema,
    });

    return useQuery({
        queryKey: UserCRUDQueryKeys.find({...queries, ...config}),
        queryFn: fetchUsers,
        ...useQueryOptionsDefaults(options),
    });
}