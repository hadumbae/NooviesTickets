/**
 * @fileoverview Renders a structured grid of theatre seats with axis labels.
 */

import {ReactElement, useMemo} from "react";
import {buildSeatLayoutMap, generateSeatElementRenderKey, TheatreSeatDetails} from "@/domains/theatre-seats";
import {TheatreScreenSeatLayoutElement} from "@/views/admin/theatre-seats/_comp/screen-seats/TheatreScreenSeatLayoutElement.tsx";

/** Props for the TheatreScreenSeatLayout component. */
type GridProps = {
    seating: TheatreSeatDetails[];
};

/**
 * Displays a dynamic seating map organised by row and column coordinates.
 */
export function TheatreScreenSeatLayout(
    {seating}: GridProps
): ReactElement {
    const {sortedSeats, maxX} = useMemo(
        () => buildSeatLayoutMap({seating}),
        [seating],
    );

    const seatEntries = useMemo(() => Array.from(sortedSeats), [sortedSeats]);

    const gridStyle = useMemo(
        () => ({
            display: "grid",
            gridTemplateColumns: `0.5fr repeat(${maxX + 1}, 1fr)`,
            gap: "0.25rem",
        }),
        [maxX]
    );

    return (
        <div className="space-y-2">
            {seatEntries.map(([y, rowSeats]) => (
                <div style={gridStyle} key={y}>
                    <TheatreScreenSeatLayoutElement element={y}/>

                    {rowSeats.map((element, index) => (
                        <TheatreScreenSeatLayoutElement
                            key={generateSeatElementRenderKey(element, index)}
                            element={element}
                        />
                    ))}

                    <TheatreScreenSeatLayoutElement element={y}/>
                </div>
            ))}
        </div>
    );
}
