/**
 * @fileoverview Client page for displaying theatre details and available screens with showings.
 */

import {ReactElement} from "react";
import {useSetPageTitle} from "@/shared/_feat";
import {SlugRouteParamObject} from "@/shared/_schemas/route/SlugRouteParamSchema.ts";
import {QueryDataLoader} from "@/views/shared/_feat";
import {useLoaderData} from "react-router-dom";

import {useFetchTheatreInfoViewData, useTheatreInfoQueryOptionsContext} from "@/domains/theatres/_feat";
import {TheatreInfoPageContent} from "@/views/client/theatres/_pages/theatre-info/content.tsx";

/**
 * Theatre information page.
 */
export function TheatreInfoPage(): ReactElement {
    const {setTitle} = useSetPageTitle({presetTitle: "Theatre Info"});

    const {slug: theatreSlug} = useLoaderData<SlugRouteParamObject>();

    const {values: {date}} = useTheatreInfoQueryOptionsContext();

    const query = useFetchTheatreInfoViewData({
        theatreSlug,
        localDateString: date,
        queries: {limit: 3},
    });

    return (
        <QueryDataLoader query={query}>
            {({theatre, screens, upcoming}) => (
                <TheatreInfoPageContent
                    theatre={theatre}
                    screens={screens}
                    localDate={date}
                    setPageTitle={setTitle}
                    upcoming={upcoming}
                />
            )}
        </QueryDataLoader>
    );
}