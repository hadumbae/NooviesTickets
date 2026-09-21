/**
 * @fileoverview Admin page for fetching and rendering showing details and associated seat maps.
 */

import {FC} from "react";
import {ShowingDetailsPageContent} from "@/views/admin/showings/_pages/details-page/content.tsx";
import {SlugRouteParamObject} from "@/shared/_schemas/route/SlugRouteParamSchema.ts";
import {QueryDataLoader} from "@/views/shared/_feat";
import {
    ShowingDetailsViewDataSchema,
    useFetchShowingDetailsViewData
} from "@/views/admin/showings/_feat/admin-view-data";
import {ShowingDetailsUIContextProvider} from "@/domains/showings/_ctx/showing-details-ui-context/provider.tsx";
import {IsDeletingUIContextProvider} from "@/shared/_ctx/ui";
import {useLoaderData} from "react-router-dom";
import {useSetAdminPageTitle} from "@/shared/_feat";

/**
 * Entry point for the Showing Details admin page.
 * Validates route parameters and orchestrates parallel data fetching for showings and seating.
 */
export const ShowingDetailsPage: FC = () => {
    const {slug} = useLoaderData<SlugRouteParamObject>();
    const {setTitle} = useSetAdminPageTitle({presetTitle: "Showing Details"});

    const query = useFetchShowingDetailsViewData({
        slug,
        schema: ShowingDetailsViewDataSchema,
    });

    return (
        <QueryDataLoader query={query}>
            {({showing, seating, theatre, screen, movie}) => (
                <IsDeletingUIContextProvider>
                    <ShowingDetailsUIContextProvider>
                        <ShowingDetailsPageContent
                            showing={showing}
                            seating={seating}
                            theatre={theatre}
                            screen={screen}
                            movie={movie}
                            setTitle={setTitle}
                        />
                    </ShowingDetailsUIContextProvider>
                </IsDeletingUIContextProvider>
            )}
        </QueryDataLoader>
    );
}


