import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/shared/_err/HttpResponseError.ts";
import {ShowingDetailsViewData} from "@/views/admin/showings/_feat/admin-view-data/schema";
import {SlugString} from "@noovies-tickets/common";
import {ZodType, ZodTypeDef} from "zod";
import {FetchQueryOptions} from "@/shared/_types/fetch-queries/FetchQueryOptions.ts";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {getFetchShowingDetailsViewData} from "@/views/admin/showings/_feat/admin-view-data/repository";
import {ShowingAdminViewDataQueryKeys} from "@/views/admin/showings/_feat/admin-view-data/fetch/queryKeys.ts";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";

type FetchConfig<TData = unknown> = {
    slug: SlugString;
    schema: ZodType<TData, ZodTypeDef, unknown>;
    options?: FetchQueryOptions<TData>;
}

export function useFetchShowingDetailsViewData(
    {slug, schema, options}: FetchConfig
): UseQueryResult<ShowingDetailsViewData, HttpResponseError> {
    const fetchViewData = buildQueryFn({
        action: () => getFetchShowingDetailsViewData({slug}),
        schema,
    });

    return useQuery({
        queryKey: ShowingAdminViewDataQueryKeys.showingDetails({slug}),
        queryFn: fetchViewData,
        ...useQueryOptionsDefaults(options),
    })
}