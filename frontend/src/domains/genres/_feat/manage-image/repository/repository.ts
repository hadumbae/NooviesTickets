/**
 * @fileoverview Repository for managing genre image upload and removal operations.
 */

import {FetchRequestReturns} from "@/shared/_types/request/FetchRequestReturns.ts";
import {Genre} from "@noovies-tickets/common";
import {
    RemoveGenreImageConfig,
    UpdateGenreImageConfig
} from "@/domains/genres/_feat/manage-image/repository/repository.types.ts";
import {buildURL} from "@/shared/_feat/fetch-api";
import {ManageGenreImageBaseURL} from "@/domains/genres/_feat/manage-image/repository/baseURL.ts";
import {handleFetchOperation} from "@/shared/_feat/use-fetch-api/handleFetchOperation.ts";

/** Updates a genre's image using multipart form data. */
export async function patchUpdateGenreImage(
    {_id, formData}: UpdateGenreImageConfig
): Promise<FetchRequestReturns<Genre>> {
    const url = buildURL({
        baseURL: ManageGenreImageBaseURL,
        path: `/item/${_id}/image/update`,
    });

    return handleFetchOperation({url, method: "PATCH", data: formData});
}

/** Removes the current image associated with a genre. */
export async function patchRemoveGenreImage(
    {_id}: RemoveGenreImageConfig
): Promise<FetchRequestReturns<Genre>> {
    const url = buildURL({
        baseURL: ManageGenreImageBaseURL,
        path: `/item/${_id}/image/remove`,
    });

    return handleFetchOperation({url, method: "PATCH"});
}