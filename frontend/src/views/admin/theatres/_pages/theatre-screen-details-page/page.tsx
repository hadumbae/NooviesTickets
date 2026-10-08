/**
 * @fileoverview Main entry component for the Theatre Screen details administration page.
 */

import {ReactElement} from "react";
import {useSetAdminPageTitle} from "@/shared/_feat";
import {QueryDataLoader} from "@/views/shared/_feat";
import {TheatreScreenDetailsPageContent} from "@/views/admin/theatres/_pages/theatre-screen-details-page/content.tsx";
import {
    TheatreScreenDetailsRouteParams,
    TheatreScreenDetailsViewData,
    useFetchTheatreScreenDetailsViewData
} from "@/domains/theatre-screens";
import {
    useTheatreScreenDetailsQueryOptionsContext
} from "@/domains/theatre-screens/_feat/validate-query-options/theatre-screen-details";
import {IsDeletingUIContextProvider, IsEditingUIContextProvider} from "@/shared/_ctx/ui";
import {useLoaderData} from "react-router-dom";

/**
 * Orchestrates route parameter validation and data fetching for the screen details view.
 */
export function TheatreScreenDetailsPage(): ReactElement {
    const {setTitle} = useSetAdminPageTitle({presetTitle: "Theatre Screen"})

    const {theatreSlug, screenSlug} = useLoaderData<TheatreScreenDetailsRouteParams>();

    const {values: {recentShowingsCount}} = useTheatreScreenDetailsQueryOptionsContext();

    const query = useFetchTheatreScreenDetailsViewData({
        screenSlug,
        theatreSlug,
        recentShowingsCount,
    });

    return (
        <QueryDataLoader query={query}>
            {({theatre, screen, seats, recentShowings}: TheatreScreenDetailsViewData) => (
                <IsEditingUIContextProvider>
                    <IsDeletingUIContextProvider>
                        <TheatreScreenDetailsPageContent
                            theatre={theatre}
                            screen={screen}
                            seats={seats}
                            recentShowings={recentShowings}
                            setTitle={setTitle}
                        />
                    </IsDeletingUIContextProvider>
                </IsEditingUIContextProvider>
            )}
        </QueryDataLoader>
    );
}