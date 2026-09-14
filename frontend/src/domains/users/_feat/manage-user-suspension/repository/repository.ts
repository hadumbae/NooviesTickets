/**
 * @fileoverview API repository functions for executing administrative user suspension patches.
 */

import {ManageUserSuspensionConfig} from "@/domains/users/_feat/manage-user-suspension/repository/repository.types.ts";
import {FetchRequestReturns} from "@/shared/_types";
import {buildURL, handleFetchOperation} from "@/shared/_feat";
import {ManageUserSuspensionBaseURL} from "@/domains/users/_feat/manage-user-suspension/repository/baseURL.ts";
import {UpdateUserSuspensionReturns} from "@/domains/users/_feat/manage-user-suspension/schema";

/**
 * Sends an HTTP PATCH request to update a user's suspension status.
 */
export async function patchUpdateUserSuspension(
    {userId, data}: ManageUserSuspensionConfig
): Promise<FetchRequestReturns<UpdateUserSuspensionReturns>> {
    const url = buildURL({
        baseURL: ManageUserSuspensionBaseURL,
        path: `/user/${userId}/suspension/update`,
    });

    return handleFetchOperation({url, method: "PATCH", data});
}