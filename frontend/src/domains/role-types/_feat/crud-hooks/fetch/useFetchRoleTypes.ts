/**
 * @fileoverview Hook for fetching and validating a list of role types.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {HttpResponseError} from "@noovies-tickets/common";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import {ListQueryConfig} from "@/shared/_types";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {find} from "@/domains/role-types/_feat/crud";
import {RoleTypeCRUDQueryKeys} from "@/domains/role-types/_feat/crud-hooks/keys";

/** Fetches a list of role types based on provided query parameters and schema validation. */
export function useFetchRoleTypes<TData = unknown>(
    {schema, queries, config, options}: ListQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchRoleTypes = buildQueryFn<TData>({
        action: () => find({queries, config}),
        schema
    });

    return useQuery({
        queryKey: RoleTypeCRUDQueryKeys.find({...queries, ...config}),
        queryFn: fetchRoleTypes,
        ...useQueryOptionsDefaults(options),
    });
}
