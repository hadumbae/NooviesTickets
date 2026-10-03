/**
 * @fileoverview Renders a list of recently modified seats using specific card components based on layout type.
 */

import {Dispatch, ReactElement, SetStateAction} from 'react';
import {ObjectIdString} from "@noovies-tickets/common";

import {TheatreSeatDetails} from "@/domains/theatre-seats/_schema";
import {TheatreSeatFormSubmitSeatCard} from "@/views/admin/theatre-seats/_comp/returned-seat-list/TheatreSeatFormSubmitSeatCard.tsx";
import {
    TheatreSeatFormSubmitStructureCard
} from "@/views/admin/theatre-seats/_comp/returned-seat-list/TheatreSeatFormSubmitStructureCard.tsx";

/** Props for the TheatreSeatFormSubmitList component. */
type ListProps = {
    returnedSeating: TheatreSeatDetails[];
    setReturnedSeating: Dispatch<SetStateAction<TheatreSeatDetails[]>>;
};

/**
 * Iterates through a collection of seat details and renders the appropriate UI card.
 */
export function TheatreSeatFormSubmitList(
    {returnedSeating, setReturnedSeating}: ListProps
): ReactElement {
    const removeSeat = (_id: ObjectIdString) => {
        setReturnedSeating(prev => prev.filter(s => s._id !== _id));
    };

    return (
        <div className="grid grid-cols-1 gap-4">
            {returnedSeating.map((seat: TheatreSeatDetails) => {
                const {layoutType, _id} = seat;

                return layoutType === "SEAT"
                    ? <TheatreSeatFormSubmitSeatCard key={_id} seat={seat} removeSeat={removeSeat}/>
                    : <TheatreSeatFormSubmitStructureCard key={_id} seat={seat} removeSeat={removeSeat}/>;
            })}
        </div>
    );
}
