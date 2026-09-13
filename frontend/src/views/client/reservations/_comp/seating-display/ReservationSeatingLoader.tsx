/**
 * @fileoverview Loads seating data for a showing into a reservation-scoped seating view.
 */

import {ObjectIdString} from "@noovies-tickets/common";
import {SeatMapDetailsLoader} from "@/views/admin/seatmaps/_comp/loaders/SeatMapDetailsLoader.tsx";
import {ReservationSeatingView} from "@/views/client/reservations/_comp/seating-display/ReservationSeatingView.tsx";
import {ReactElement} from "react";

import {SeatMapDetails} from "@/domains/seatmaps/_schema/model/SeatMapDetailsSchema";

/** Props for the ReservationSeatingLoader component. */
type LoaderProps = {
    selectedSeating: ObjectIdString[];
    showingID: ObjectIdString;
};

/**
 * Fetches seating data for a specific showing and renders the reservation seating view.
 */
export function ReservationSeatingLoader(
    {selectedSeating, showingID}: LoaderProps
): ReactElement {
    return (
        <SeatMapDetailsLoader queries={{showing: showingID}}>
            {(seating: SeatMapDetails[]) => (
                <ReservationSeatingView
                    selectedSeating={selectedSeating}
                    seating={seating}
                />
            )}
        </SeatMapDetailsLoader>
    );
}
