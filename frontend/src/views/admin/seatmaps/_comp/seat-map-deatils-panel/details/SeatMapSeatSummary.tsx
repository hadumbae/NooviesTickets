/**
 * @fileoverview Renders a summary section for a single physical seat within the SeatMap details context panel.
 */

import {ReactElement} from "react";
import {DetailsCardSpan} from "@/views/shared/_comp/text-display/spans/DetailsCardSpan.tsx";
import {SectionTitle} from "@/views/shared/_comp";
import {formatSeatLabel, TheatreSeatDetails, TheatreSeatTypeLabelMap} from "@/domains/theatre-seats";

/** Props for the SeatMapSeatSummary component. */
type SectionProps = {
    seat: Extract<TheatreSeatDetails, { layoutType: "SEAT" }>;
};

/** Renders a summary section for a single physical seat within the SeatMap details context panel. */
export const SeatMapSeatSummary = ({seat}: SectionProps): ReactElement => {
    const {x, y, seatType} = seat;

    const seatIdentifier = formatSeatLabel(seat);
    const formattedXY = `X${x}, Y${y}`;
    const formattedSeatType = TheatreSeatTypeLabelMap[seatType];

    return (
        <section>
            <SectionTitle>Seat</SectionTitle>

            <div className="rounded-container-border space-y-1 py-2 px-5 flex justify-between items-center">
                <DetailsCardSpan label="Seat" text={seatIdentifier}/>
                <DetailsCardSpan label="Seat Type" text={formattedSeatType}/>
                <DetailsCardSpan label="XY" text={formattedXY}/>
            </div>
        </section>
    );
};