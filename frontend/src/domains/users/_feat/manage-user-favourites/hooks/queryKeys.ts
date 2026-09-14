/**
 * @fileoverview Query key factory for managing user favorite movies and media.
 */

import {buildQueryKey} from "@/shared/_feat";

/** Query keys for fetching and invalidating user favorite data. */
export const ManageUserFavouritesQueryKeys = buildQueryKey(
    ["user", "profile", "favourites"],
    {
        fetchCurrent: ["fetch", "current"],
        checkMovie: ["check", "movie"]
    }
);