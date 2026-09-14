/**
 * @fileoverview Repository for user password update operations.
 */

import {FetchRequestReturns} from "@/shared/_types/request/FetchRequestReturns.ts";
import {handleFetchOperation} from "@/shared/_feat/use-fetch-api/handleFetchOperation.ts";
import type {PasswordUpdateData} from "@/domains/users/_feat/update-password/repository/repository.types.ts";
import {buildURL} from "@/shared/_feat/fetch-api";
import {UpdateUserPasswordBaseURL} from "@/domains/users/_feat/update-password/repository/baseURL";

/** Sends a PATCH request to update a specific user's password. */
export function updateUserPassword(
    {userID, data}: PasswordUpdateData
): Promise<FetchRequestReturns> {
    const url = buildURL({
        baseURL: UpdateUserPasswordBaseURL,
        path: `/password/${userID}/update`,
    });

    return handleFetchOperation({url, method: "PATCH", data});
}
