/**
 * @fileoverview Renders the seat layout display section for theatre screen details.
 */

import {ReactElement} from "react";
import {TheatreSeatDetails, TheatreSeatPanelContextProvider} from "@/domains/theatre-seats";
import {TheatreScreenSeatLayout, TheatreSeatContextPanel} from "@/views/admin/theatre-seats";
import {EmptyArrayContainer, PageSectionHeader} from "@/views/shared/_comp";
import {Card, CardContent, ScrollArea, ScrollBar} from "@/views/shared/_comp/ui";

/** Props for the TheatreScreenDetailsLayoutSection component. */
type SectionProps = {
    seating: TheatreSeatDetails[];
};

/**
 * Renders the seating layout grid and contextual seat panel wrapped in the seat panel context provider.
 */
export function TheatreScreenDetailsLayoutSection(
    {seating}: SectionProps
): ReactElement {
    return (
        <TheatreSeatPanelContextProvider>
            <section className="space-y-4">
                <PageSectionHeader>Seat Layout</PageSectionHeader>

                <ScrollArea>
                    {
                        seating.length > 0 ? (
                            <Card>
                                <CardContent className="p-4">
                                    <TheatreScreenSeatLayout seating={seating}/>
                                </CardContent>
                            </Card>
                        ) : (
                            <EmptyArrayContainer
                                className="rounded-container-border h-56"
                                text="There Are No Seats"
                            />
                        )
                    }

                    <ScrollBar orientation="horizontal"/>
                    <TheatreSeatContextPanel/>
                </ScrollArea>
            </section>
        </TheatreSeatPanelContextProvider>
    );
}