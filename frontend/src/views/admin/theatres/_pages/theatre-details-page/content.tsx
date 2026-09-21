/**
 * @fileoverview Main content component for the Theatre Details administrative page.
 */

import {ReactElement, useEffect} from 'react';
import {PageFlexWrapper} from "@/views/shared/_comp/page";
import {SROnly} from "@/views/shared/_comp/screen-readers";

import {TheatreDetailsViewData} from "@/domains/theatres/_feat";
import {TheatreDetailsCard} from "@/views/admin/theatres/_comp";
import {
    TheatreDetailsPageScreenSection,
    TheatreDetailsPageShowingSection
} from "@/views/admin/theatres/_pages/theatre-details-page/sections";
import {
    TheatreDetailsBreadcrumbs,
    TheatreDetailsPageActions,
    TheatreDetailsToggles
} from "@/views/admin/theatres/_pages/theatre-details-page/elements";
import {IconButton, PageHeader} from "@/views/shared/_comp";
import {Ellipsis} from "lucide-react";

/** Props for the TheatreDetailsPageContent component. */
type TheatreDetailsPageContentProps = {
    pageData: TheatreDetailsViewData
    screenPage: number;
    screenPerPage: number;
    setScreenPage: (page: number) => void;
    setTitle: (title: string) => void;
};

/**
 * Renders the layout for theatre management, including details cards and related data tabs.
 */
export function TheatreDetailsPageContent(
    {pageData, screenPage, screenPerPage, setScreenPage, setTitle}: TheatreDetailsPageContentProps
): ReactElement {
    const {theatre, screens, showings} = pageData;
    const {_id: theatreID, slug: theatreSlug, name: theatreName} = theatre;

    useEffect(() => {
        setTitle(pageData.theatre.name);
    }, [pageData, setTitle]);

    return (
        <PageFlexWrapper>
            <PageHeader
                title={theatreName}
                description="Theatre"
                breadcrumbs={
                    <TheatreDetailsBreadcrumbs theatreName={theatreName}/>
                }
                actions={
                    <TheatreDetailsToggles>
                        <IconButton icon={Ellipsis}/>
                    </TheatreDetailsToggles>
                }
            />

            <section>
                <SROnly text="Theatre Details Card"/>
                <TheatreDetailsCard theatre={theatre}/>
            </section>

            <TheatreDetailsPageScreenSection
                theatreID={theatreID}
                theatreSlug={theatreSlug}
                screens={screens.items}
                totalScreens={screens.totalItems}
                page={screenPage}
                perPage={screenPerPage}
                setPage={setScreenPage}
            />

            <TheatreDetailsPageShowingSection
                theatreSlug={theatreSlug}
                showings={showings}
            />

            <TheatreDetailsPageActions
                theatre={theatre}
            />
        </PageFlexWrapper>
    );
}