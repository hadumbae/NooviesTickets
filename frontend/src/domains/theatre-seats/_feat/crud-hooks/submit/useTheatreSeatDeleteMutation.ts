/**
 * @fileoverview Hook for deleting a single seat entity with automatic cache invalidation and notifications.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {ObjectIdString} from "@noovies-tickets/common";

import {destroy} from "@/domains/theatre-seats/_feat/crud";
import {TheatreSeatCRUDMutationKeys, TheatreSeatCRUDQueryKeys} from "@/domains/theatre-seats/_feat/crud-hooks/keys";
import {TheatreScreenAdminViewDataQueryKeys} from "@/domains/theatre-screens";

type DeleteValue = {
    _id: ObjectIdString;
};

/**
 * Executes a seat deletion mutation and synchronizes the local cache by invalidating seat lists.
 */
export function useTheatreSeatDeleteMutation(): UseMutationResult<void, unknown, DeleteValue> {
    const queryClient = useQueryClient();

    const deleteSeat = async ({_id}: DeleteValue) => {
        await destroy({_id})
    };

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: TheatreSeatCRUDQueryKeys.list(), exact: false});
        queryClient.invalidateQueries({queryKey: TheatreScreenAdminViewDataQueryKeys.all, exact: false});
    };

    return useMutation({
        mutationKey: TheatreSeatCRUDMutationKeys.deleteSingle(),
        mutationFn: deleteSeat,
        onSuccess,
    });
}
