/**
 * @fileoverview Presentational content layer for the Showing Details page.
 */

import {ReactElement, useEffect} from "react";
import {PageFlexWrapper, PageSectionHeader} from "@/views/shared/_comp/page";

import {ShowingDetails} from "@/domains/showings/_schema/showing/ShowingDetailsSchema.ts";
import {ReservationType} from "@noovies-tickets/common";
import {ShowingSelectorInfoCard} from "@/views/client/showings/_comp";
import {ShowingInfoPageHeader} from "@/views/client/showings/_pages/showing-info/header.tsx";
import {ReservationForm, ReservationFormView} from "@/views/client/reservations/_feat/reserve-ticket-form/form";
import {useJoinShowingRoom} from "@/domains/showings";
import {useNavigate} from "react-router-dom";

/** Props for the ShowingInfoPageContent component. */
type ContentProps = {
    showing: ShowingDetails;
    setTitle: (title: string) => void;
};

/**
 * Renders formatted showing metadata and the interactive ticket reservation workflow.
 */
export function ShowingInfoPageContent(
    {showing, setTitle}: ContentProps
): ReactElement {
    const navigate = useNavigate();

    const {
        _id: showingID,
        movie: {_id: movieID, title: movieTitle},
        theatre: {name: theatreName},
        config: {canReserveSeats}
    } = showing;

    useJoinShowingRoom({showingId: showingID});

    useEffect(() => {
        setTitle(`${movieTitle} • ${theatreName}`);
    }, [movieTitle, theatreName, setTitle]);
    const reservationType: ReservationType = canReserveSeats
        ? "RESERVED_SEATS"
        : "GENERAL_ADMISSION";

    const navigateToReservations = () => {
        navigate("/account/reservations");
    };

    console.log("Showing ID: ", showingID);

    // 6ac00dff88d8d1ad7ec0ad4b
    // 6a9749be3a247914d779b788
    return (
        <PageFlexWrapper>
            <ShowingInfoPageHeader showing={showing}/>

            <div className="flex justify-center">
                <ShowingSelectorInfoCard
                    showing={showing}
                    className="w-full md:w-2/3 xl:w-1/3"
                />
            </div>

            <section className="space-y-4">
                <PageSectionHeader text="Ticket Selection"/>

                {/* Form orchestrator handling both GA and Reserved Seating logic */}
                <ReservationForm
                    presetValues={{showing: showingID, movie: movieID, reservationType, currency: "USD"}}
                    onSubmitSuccess={navigateToReservations}
                >
                    <ReservationFormView reservationType={reservationType}/>
                </ReservationForm>
            </section>

        </PageFlexWrapper>
    );
}