/**
 * @fileoverview Seat-specific confirmation dialog for deleting seats or layout elements with dynamic title generation.
 */

import {ReactElement, ReactNode} from 'react';
import {
    EntityDeleteWarningDialog
} from "@/views/shared/_feat/dialog/EntityDeleteWarningDialog.tsx";
import {buildString, MutationResponseConfig} from "@/shared/_feat";
import {TheatreSeatLayoutTypeLabelMap} from "@/domains/theatre-seats";
import {TheatreSeatDetails} from "@/domains/theatre-seats";
import {useDeleteTheatreSeatSubmitHandler} from "@/domains/theatre-seats";
import {UIOpenStateProps} from "@/shared/_types";
import {ObjectIdString, TheatreSeat} from "@noovies-tickets/common";

/** Props for the TheatreSeatDeleteWarningDialog component. */
type WarningProps = MutationResponseConfig<void, { _id: ObjectIdString }> & UIOpenStateProps & {
    children: ReactNode;
    seat: TheatreSeat | TheatreSeatDetails;
};

/**
 * Renders a confirmation dialog that triggers a seat deletion mutation upon user approval.
 */
export function TheatreSeatDeleteWarningDialog(
    {children, seat, isOpen, setIsOpen, ...submitConfig}: WarningProps
): ReactElement {
    const {_id, row, layoutType, x, y} = seat;
    const {deleteSeat} = useDeleteTheatreSeatSubmitHandler({_id, ...submitConfig});

    const isSeat = layoutType === "SEAT";
    const layoutLabel = TheatreSeatLayoutTypeLabelMap[layoutType];

    const label = buildString([
        isSeat
            ? `${row}${seat.seatNumber}`
            : `${row} • ${layoutLabel} • X${x}, Y${y}`,
        (isSeat && seat.seatLabel) && `[${seat.seatLabel}]`,
    ]);

    const dialogTitle = `Proceed to delete ${label}?`;

    return (
        <EntityDeleteWarningDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={dialogTitle}
            deleteResource={deleteSeat}
        >
            {children}
        </EntityDeleteWarningDialog>
    );
}
