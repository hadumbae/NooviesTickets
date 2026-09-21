/**
 * @fileoverview Layout component for rendering the structural sections of the Theatre Screen details page.
 */

import {ReactElement, useEffect} from "react";
import {PageFlexWrapper} from "@/views/shared/_comp/page";
import {
    TheatreScreenDetailsBreadcrumbs,
    TheatreScreenDetailsPageScreenActions,
    TheatreScreenDetailsToggles
} from "@/views/admin/theatres/_pages/theatre-screen-details-page/elements";

import {TheatreScreenWithVirtuals} from "@/domains/theatre-screens/_schema/model";
import {TheatreDetails} from "@/domains/theatres/_schema/theatre/TheatreDetailsSchema.ts";
import {SeatDetails} from "@/domains/seats/_schema/model";
import {PageHeader} from "@/views/shared/_comp";
import {
    TheatreScreenDetailsFormSection,
    TheatreScreenDetailsLayoutSection
} from "@/views/admin/theatres/_pages/theatre-screen-details-page/sections";
import {
    TheatreScreenScheduleSection
} from "@/views/admin/theatres/_pages/theatre-screen-details-page/sections/TheatreScreenScheduleSection.tsx";
import {ShowingDetails} from "@/domains/showings/_schema/showing/ShowingDetailsSchema.ts";

/** Props for the TheatreScreenDetailsPageContent component. */
type ContentProps = {
    theatre: TheatreDetails;
    screen: TheatreScreenWithVirtuals;
    seats: SeatDetails[];
    recentShowings: ShowingDetails[];
    setTitle: (title: string) => void;
};

/**
 * Renders the breadcrumbs, header, and tabbed interface for the screen details view.
 */
export function TheatreScreenDetailsPageContent(
    {theatre, screen, seats, recentShowings, setTitle}: ContentProps
): ReactElement {
    const {_id: screenID, name: screenName} = screen;
    const {_id: theatreID, name: theatreName, slug: theatreSlug,} = theatre;

    useEffect(() => {
        setTitle(`${screen.name} (${screen.screenType})`)
    }, [screen, setTitle]);

    return (
        <PageFlexWrapper>
            <PageHeader
                title={`${screenName} Details`}
                description={`Screen at ${theatreName}. Handle seats and showings here.`}
                actions={<TheatreScreenDetailsToggles/>}
                breadcrumbs={
                    <TheatreScreenDetailsBreadcrumbs
                        theatreSlug={theatreSlug}
                        theatreName={theatreName}
                        screenName={screenName}
                    />
                }
            />

            <TheatreScreenDetailsLayoutSection
                seating={seats}
            />

            <TheatreScreenDetailsFormSection
                screenID={screenID}
                theatreID={theatreID}
            />

            <TheatreScreenScheduleSection
                screenID={screenID}
                showings={recentShowings}
            />

            <TheatreScreenDetailsPageScreenActions
                theatre={theatre}
                screen={screen}
                className="hidden"
            />
        </PageFlexWrapper>
    );
}