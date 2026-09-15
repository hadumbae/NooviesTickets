/**
 * @fileoverview Mutation hook for deleting RoleType entities.
 */

import {ObjectIdString} from "@noovies-tickets/common";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {destroy} from "@/domains/role-types/_feat/crud";
import {RoleTypeCRUDMutationKeys, RoleTypeCRUDQueryKeys} from "@/domains/role-types/_feat/crud-hooks/keys";

/** Input parameters for the RoleType deletion mutation. */
type DeletePrompt = {
    _id: ObjectIdString
};

/** Provides a mutation function for deleting a RoleType and handles cache invalidation. */
export function useRoleTypeDeleteMutation(): UseMutationResult<void, unknown, DeletePrompt> {
    const queryClient = useQueryClient();

    const deleteRoleType = async ({_id}: DeletePrompt) => {
        await destroy({_id});
    };

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: RoleTypeCRUDQueryKeys.list(), exact: false});
    };

    return useMutation({
        mutationKey: RoleTypeCRUDMutationKeys.deleteSingle(),
        mutationFn: deleteRoleType,
        onSuccess,
    });
}
