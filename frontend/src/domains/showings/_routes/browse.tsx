/**
 * @fileoverview Defines the routing configuration for browsing movie showings.
 */

import {RouteObject} from "react-router-dom";
import {BaseLayout} from "@/views/shared/_layout/base-layout/BaseLayout.tsx";
import {ComponentErrorHandler} from "@/views/shared/_feat/error/ComponentErrorHandler.tsx";
import {buildRouteParamLoader} from "@/shared/_loaders";
import {SlugRouteParamSchema} from "@/shared/_schemas";

const slugLoader = buildRouteParamLoader({
   redirectTo: "/",
   schema: SlugRouteParamSchema,
   onErrorMessage: "Invalid Params.",
});

/** Route configuration for the public showing information and browsing views. */
export const BrowseShowingRoutes: RouteObject[] = [
    {
        path: '/browse/showings',
        element: <BaseLayout/>,
        children: [
            {
                path: "/browse/showings/:slug",
                errorElement: <ComponentErrorHandler/>,
                loader: slugLoader,
                lazy: async () => {
                    const {ShowingInfoPage} = await import("@/views/client/showings");
                    return {Component: ShowingInfoPage};
                },
            },
        ],
    }
];
