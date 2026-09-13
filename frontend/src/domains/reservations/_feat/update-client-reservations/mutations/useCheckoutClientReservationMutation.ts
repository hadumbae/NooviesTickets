/**
 * @fileoverview Mutation hook for checking out client reservation tickets.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {ObjectIdString} from "@noovies-tickets/common";
import {patchCheckoutTicket} from "@/domains/reservations/_feat/update-client-reservations/repositories";
import {
    UpdateClientReservationMutationKeys
} from "@/domains/reservations/_feat/update-client-reservations/mutations/mutationKeys.ts";
import {
    CurrentUserReservationQueryKeys
} from "@/domains/reservations/_feat/fetch-current-user-reservations/keys/CurrentUserReservationQueryKeys.ts";
import {ReservationCRUDQueryKeys} from "@/domains/reservations/_feat/crud-hooks/queryKeys.ts";

/**
 * Provides a mutation for checking out a ticket by its ID.
 */
export function useCheckoutClientReservationMutation(): UseMutationResult<void, unknown, ObjectIdString> {
    const queryClient = useQueryClient();

    const checkout = async (_id: ObjectIdString) => {
        await patchCheckoutTicket(_id);
    }

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: CurrentUserReservationQueryKeys.all, exact: false});
        queryClient.invalidateQueries({queryKey: ReservationCRUDQueryKeys.all, exact: false});
    }

    return useMutation({
        mutationKey: UpdateClientReservationMutationKeys.checkout(),
        mutationFn: checkout,
        onSuccess,
    });
}
