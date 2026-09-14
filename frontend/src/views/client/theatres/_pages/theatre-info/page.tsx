/**
 * @fileoverview Client page for displaying theatre details and available screens with showings.
 */

import {ReactElement} from "react";
import {
    useFetchByIdentifierRouteParams, useSetPageTitle
} from "@/shared/_feat";
import {SlugRouteParamSchema} from "@/shared/_schemas/route/SlugRouteParamSchema.ts";
import {PageLoader} from "@/views/shared/_comp/page";
import {QueryDataLoader} from "@/views/shared/_feat";

import {useFetchTheatreInfoViewData, useTheatreInfoQueryOptionsContext} from "@/domains/theatres/_feat";
import {TheatreInfoPageContent} from "@/views/client/theatres/_pages/theatre-info/content.tsx";

/**
 * Theatre information page.
 */
export function TheatreInfoPage(): ReactElement {
    const {setTitle} = useSetPageTitle({presetTitle: "Theatre Info"});

    const {slug: theatreSlug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/browse/theatres",
        errorMessage: "Invalid theatre.",
        sourceComponent: TheatreInfoPage.name,
    }) ?? {};

    const {values: {date}} = useTheatreInfoQueryOptionsContext();

    const query = useFetchTheatreInfoViewData({
        theatreSlug: theatreSlug!,
        localDateString: date,
        queries: {limit: 3},
        options: {enabled: !!theatreSlug}
    });

    if (!theatreSlug) {
        return <PageLoader/>;
    }

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