/**
 * @fileoverview React Query hook for fetching paginated RoleType records.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/shared/_err/HttpResponseError.ts";
import {PaginatedQueryConfig} from "@/shared/_types";
import {useQueryOptionDefaults} from "@/shared/_feat/handle-query/useQueryOptionDefaults.ts";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {paginated} from "@/domains/role-types/_feat/crud";
import {RoleTypeCRUDQueryKeys} from "@/domains/role-types/_feat/crud-hooks/keys";

/** Fetches paginated RoleType records using React Query. */
export function useFetchPaginatedRoleTypes<TData = unknown>(
    {schema, page, perPage, queries, options, config}: PaginatedQueryConfig<TData>,
): UseQueryResult<TData, HttpResponseError> {
    const fetchPaginatedRoleTypes = buildQueryFn<TData>({
        action: () => paginated({queries, config, pagination: {page, perPage}}),
        schema,
    });

    return useQuery({
        queryKey: RoleTypeCRUDQueryKeys.paginated({page, perPage, ...queries, ...config}),
        queryFn: fetchPaginatedRoleTypes,
        ...useQueryOptionDefaults(options),
    });
}
