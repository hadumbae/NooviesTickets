/**
 * @fileoverview Hook for managing the user index query options form state and validation.
 */

import {QueryOptionsFormValues} from "@/shared/_feat";
import {UserQueryOptions, UserQueryOptionsSchema} from "@/domains/users/_schema/query-options";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    UserIndexQueryOptionsFormValues
} from "@/domains/users/_feat/submit-query-options/user-index-query-options/types.ts";
import {
    useUserIndexQueryOptionsFormDefaultValues
} from "@/domains/users/_feat/submit-query-options/user-index-query-options/useUserIndexQueryOptionsFormDefaultValues.ts";

/** Initializes a React Hook Form instance for user index query options using Zod validation. */
export function useUserIndexQueryOptionsForm(
    config: QueryOptionsFormValues<UserIndexQueryOptionsFormValues, UserQueryOptions>
): UseFormReturn<UserIndexQueryOptionsFormValues, unknown, UserQueryOptions> {
    const defaultValues = useUserIndexQueryOptionsFormDefaultValues(config);

    return useForm<UserIndexQueryOptionsFormValues, unknown, UserQueryOptions>({
        resolver: zodResolver(UserQueryOptionsSchema),
        defaultValues,
    });
}