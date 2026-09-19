/**
 * @fileoverview React Query hook for fetching a single RoleType by its unique ID.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {HttpResponseError} from "@noovies-tickets/common";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import {IDQueryConfig} from "@/shared/_types";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {findByID} from "@/domains/role-types/_feat/crud";
import {RoleTypeCRUDQueryKeys} from "@/domains/role-types/_feat/crud-hooks/keys";

/** Fetches a RoleType document and validates it against a provided schema. */
export function useFetchRoleType<TData = unknown>(
    {schema, _id, config, options}: IDQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchRoleType = buildQueryFn<TData>({
        action: () => findByID({_id, config}),
        schema,
    });

    return useQuery({
        queryKey: RoleTypeCRUDQueryKeys._id({_id, ...config}),
        queryFn: fetchRoleType,
        ...useQueryOptionsDefaults(options),
    });
}
