/**
 * @fileoverview Query key definitions for current user reservation data.
 */

import {buildQueryKey} from "@/shared/_feat";

/** Query key factory for current user reservation data. */
export const CurrentUserReservationQueryKeys = buildQueryKey(
    ["reservations", "list"],
    {
        "currentUser": ["current-user"],
    }
);