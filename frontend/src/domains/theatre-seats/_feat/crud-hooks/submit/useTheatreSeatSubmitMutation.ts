/**
 * @fileoverview Mutation hook for creating or updating theatre seat entities with form synchronization.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {validateData} from "@/shared/_feat/validate-data/validateData.ts";

import {create, update} from "@/domains/theatre-seats/_feat/crud";
import {TheatreSeatDetails, TheatreSeatDetailsSchema} from "@/domains/theatre-seats/_schema";
import {TheatreSeatFormData} from "@/domains/theatre-seats/_feat/submit-data";
import {TheatreSeatCRUDMutationKeys, TheatreSeatCRUDQueryKeys} from "@/domains/theatre-seats/_feat/crud-hooks/keys";
import {TheatreScreenAdminViewDataQueryKeys} from "@/domains/theatre-screens/_feat/admin-view-data/keys";

/** Handles seat persistence, server response validation, and React Query cache invalidation. */
export function useTheatreSeatSubmitMutation(): UseMutationResult<TheatreSeatDetails, unknown, TheatreSeatFormData> {
    const queryClient = useQueryClient();
    const config = {populate: true, virtuals: true};

    const submitSeatData = async ({_id, ...values}: TheatreSeatFormData) => {
        const action = _id
            ? () => update({_id, data: values, config})
            : () => create({data: values, config});

        const {result} = await action();

        const {success, data, error} = validateData({
            data: result,
            schema: TheatreSeatDetailsSchema,
            message: "Invalid data returned. Please try again.",
        });

        if (!success) throw error;
        return data;
    };

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: TheatreSeatCRUDQueryKeys.all, exact: false})
        queryClient.invalidateQueries({queryKey: TheatreScreenAdminViewDataQueryKeys.details(), exact: false})
    };

    return useMutation({
        mutationKey: TheatreSeatCRUDMutationKeys.submit(),
        mutationFn: submitSeatData,
        onSuccess,
    });
}
