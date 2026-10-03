/**
 * @fileoverview Renders a single element within a showing's seat map layout.
 */

import {ReactElement, useCallback} from "react";
import {Button} from "@/views/shared/_comp/ui";
import {useRequiredContext} from "@/shared/_feat/use-context/useRequiredContext.ts";

import {TheatreSeatLayoutIconConstant} from "@/domains/theatre-seats";
import {SeatLayoutNonSeatElement} from "@/views/admin/theatre-seats";
import {SeatMapDetails, SeatMapDetailsPanelSetterContext} from "@/domains/seatmaps";

/** Props for the ShowingSeatMapElement component. */
type ShowingSeatMapElementProps = {
    element: SeatMapDetails | number | null;
};

/** Renders a single interactive seat or a non-interactive element inside the seating grid. */
export function ShowingSeatMapElement({element}: ShowingSeatMapElementProps): ReactElement {
    const {setSeatMap, setIsPanelOpen} = useRequiredContext({context: SeatMapDetailsPanelSetterContext});

    const onClick = useCallback(
        () => {
            if (!element || typeof element === "number") return;

            setSeatMap(element);
            setIsPanelOpen(true);
        },
        [element, setSeatMap, setIsPanelOpen],
    );

    if (!element) {
        return (
            <SeatLayoutNonSeatElement>
                •
            </SeatLayoutNonSeatElement>
        );
    }

    if (typeof element === "number") {
        return (
            <SeatLayoutNonSeatElement>
                {element !== 0 && element}
            </SeatLayoutNonSeatElement>
        );
    }

    const {seat: {layoutType}} = element;
    const Icon = TheatreSeatLayoutIconConstant[layoutType];

    return (
        <Button variant="link" className="p-1 hover:border hover:shadow" onClick={onClick}>
            <Icon size={20}/>
        </Button>
    );
}

