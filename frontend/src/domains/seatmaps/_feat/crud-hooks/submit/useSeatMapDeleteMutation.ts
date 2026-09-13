/**
 * @fileoverview Mutation hook for deleting seat map records from the repository.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {SeatMapCRUDMutationKeys, SeatMapCRUDQueryKeys} from "@/domains/seatmaps/_feat/crud-hooks/keys";
import {ObjectIdString} from "@noovies-tickets/common";
import {destroy} from "@/domains/seatmaps/_feat/crud";

type DeleteValue = {
    _id: ObjectIdString;
}

/**
 * Hook for deleting a seat map by ID that handles cache invalidation and notifications.
 */
export function useSeatMapDeleteMutation(): UseMutationResult<void, unknown, DeleteValue> {
    const queryClient = useQueryClient();

    const deleteSeatMap = async ({_id}: DeleteValue) => {
        await destroy({_id})
    };

    const onSuccess = async () => {
        queryClient.invalidateQueries({queryKey: SeatMapCRUDQueryKeys.list(), exact: true})
    }

    return useMutation({
        mutationKey: SeatMapCRUDMutationKeys.destroy(),
        mutationFn: deleteSeatMap,
        onSuccess,
    });
}
