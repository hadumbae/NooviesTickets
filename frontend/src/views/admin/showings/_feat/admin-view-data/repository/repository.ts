/**
 * @fileoverview Repository for fetching composite view data for the showing administration interface.
 */

import {
    GetFetchShowingDetailsViewDataConfig
} from "@/views/admin/showings/_feat/admin-view-data/repository/repository.types.ts";
import {ShowingDetailsViewData} from "@/views/admin/showings/_feat/admin-view-data/schema";
import {buildURL} from "@/shared/_feat/fetch-api";
import {ShowingAdminViewDataBaseURL} from "@/views/admin/showings/_feat/admin-view-data/repository/baseURL.ts";
import {FetchRequestReturns} from "@/shared/_types/request/FetchRequestReturns.ts";
import {handleFetchOperation} from "@/shared/_feat/use-fetch-api/handleFetchOperation.ts";

/** Fetches detailed view data for a specific showing by its slug. */
export async function getFetchShowingDetailsViewData(
    {slug}: GetFetchShowingDetailsViewDataConfig
): Promise<FetchRequestReturns<ShowingDetailsViewData>> {
    const url = buildURL({
        baseURL: ShowingAdminViewDataBaseURL,
        path: `/item/${slug}/details`,
    });

    return handleFetchOperation({url, method: "GET"});
}