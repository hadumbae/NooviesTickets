import {FetchRequestReturns} from "@/shared/_types/request/FetchRequestReturns";
import {buildURL} from "@/shared/_feat/fetch-api/buildURL";
import {MovieReviewAdminActionsBaseURL} from "@/domains/movie-reviews/_feat/admin-actions/baseURL";
import {handleFetchOperation} from "@/shared/_feat/use-fetch-api/handleFetchOperation";
import {ObjectIdString} from "@noovies-tickets/common";
import {ModerationMessageFormData} from "@/shared/_feat/moderation/forms/ModerationMessageFormSchema";

/**
 * Configuration for the API request to clear engagement metrics.
 */
export type PatchResetReviewLikesConfig = {
    reviewID: ObjectIdString;
    data: ModerationMessageFormData;
};

/** Clears all helpful votes and likes from a specific movie review. */
export function patchResetReviewLikes<TData = unknown>(
    {reviewID, data}: PatchResetReviewLikesConfig
): Promise<FetchRequestReturns<TData>> {
    const url = buildURL({
        baseURL: MovieReviewAdminActionsBaseURL,
        path: `/rev/${reviewID}/likes`,
    });

    return handleFetchOperation({url, method: "PATCH", data});
}