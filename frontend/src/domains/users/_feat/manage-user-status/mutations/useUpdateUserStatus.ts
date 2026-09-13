/**
 * @fileoverview React Hook for managing user status update mutations using React Query.
 */

import {ObjectIdString} from "@noovies-tickets/common";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {UpdateUserStatusFormData, UpdateUserStatusReturns} from "@/domains/users/_feat/manage-user-status/schema";
import {patchUpdateUserStatus} from "@/domains/users/_feat/manage-user-status/repository";
import {ManageUserStatusMutationKeys} from "@/domains/users/_feat/manage-user-status/keys";

/** Configuration options for the useUpdateUserStatus hook. */
export type UseUpdateUserStatusConfig = {
    userId: ObjectIdString;
}

/**
 * Custom React Query hook for executing the user status update mutation.
 */
export function useUpdateUserStatus(
    {userId}: UseUpdateUserStatusConfig
): UseMutationResult<UpdateUserStatusReturns, unknown, UpdateUserStatusFormData> {
    const updateUserStatus = async (data: UpdateUserStatusFormData) => {
        const {result} = await patchUpdateUserStatus({userId, data});
        return result;
    }

    return useMutation({
        mutationKey: ManageUserStatusMutationKeys.update({userId}),
        mutationFn: updateUserStatus,
    })
}