/**
 * @fileoverview React Query hook for cancelling a movie showing entity.
 */

import {FetchQueryOptions} from "@/shared/_types";
import {Showing, ShowingSchema} from "@/domains/showings";
import {HttpResponseError, ObjectIdString} from "@noovies-tickets/common";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {buildQueryFn, useQueryOptionsDefaults} from "@/shared/_feat";
import {patchCancelShowing} from "@/domains/showings/_feat/showing-actions/cancel-showing/patchCancelShowing.ts";
import {ShowingActionsQueryKeys} from "@/domains/showings/_feat/showing-actions/queryKeys.ts";

/** Props for the FetchConfig type. */
type FetchConfig = {
    _id: ObjectIdString;
    options?: FetchQueryOptions<Showing>;
}

/**
 * Hook to execute and manage the cancellation of a movie showing via React Query.
 */
export function useCancelShowing(
    {_id, options}: FetchConfig,
): UseQueryResult<Showing, HttpResponseError> {
    const cancelShowing = buildQueryFn({
        action: () => patchCancelShowing({_id}),
        schema: ShowingSchema,
    });

    return useQuery({
        queryKey: ShowingActionsQueryKeys.cancel({_id}),
        queryFn: cancelShowing,
        ...useQueryOptionsDefaults(options),
    });
}