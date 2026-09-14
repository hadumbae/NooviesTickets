/**
 * @fileoverview Defines query keys for fetching customer movie reservation data.
 */

import {buildQueryKey} from "@/shared/_feat"

/** Query keys for customer movie reservation views. */
export const CustomerReservationsViewQueryKeys = buildQueryKey(
    ["customer", "views"],
    {reservations: ["profile", "reservations", "index"]}
)