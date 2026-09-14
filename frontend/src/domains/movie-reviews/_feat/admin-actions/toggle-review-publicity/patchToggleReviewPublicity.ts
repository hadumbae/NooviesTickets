import {ObjectIdString} from "@noovies-tickets/common";
import {ModerationMessageFormData} from "@/shared/_feat/moderation/forms/ModerationMessageFormSchema";
import {FetchRequestReturns} from "@/shared/_types/request/FetchRequestReturns";
import {buildURL} from "@/shared/_feat/fetch-api/buildURL";
import {MovieReviewAdminActionsBaseURL} from "@/domains/movie-reviews/_feat/admin-actions/baseURL";
import {handleFetchOperation} from "@/shared/_feat/use-fetch-api/handleFetchOperation";

/**
 * Configuration for the API request to toggle a review's visibility.
 */
export type PatchToggleReviewPublicityConfig = {
    reviewID: ObjectIdString;
    data: ModerationMessageFormData;
};

/** Toggles the public visibility status of a specific movie review. */
export function patchToggleReviewPublicity<TData = unknown>(
    {reviewID, data}: PatchToggleReviewPublicityConfig
): Promise<FetchRequestReturns<TData>> {
    const url = buildURL({
        baseURL: MovieReviewAdminActionsBaseURL,
        path: `/rev/${reviewID}/publicity`,
    });

    return handleFetchOperation({url, method: "PATCH", data});
}