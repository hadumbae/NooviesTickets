/**
 * @fileoverview Query key factory definitions for client homepage data caching.
 */

import {buildQueryKey} from "@/shared/_feat";

/** Query key factory for managing React Query caching of client homepage data requests. */
export const ClientHomepageQueryKeys = buildQueryKey(
    ["pages", "client"],
    {homepage: ["homepage"]}
);