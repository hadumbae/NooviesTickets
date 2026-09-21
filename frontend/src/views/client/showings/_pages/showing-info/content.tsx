/**
 * @fileoverview Presentational content layer for the Showing Details page.
 */

import {ReactElement, useEffect} from "react";
import {PageFlexWrapper, PageSectionHeader} from "@/views/shared/_comp/page";
import {useLoggedNavigate} from "@/shared/_feat/navigation/useLoggedNavigate.ts";

import {ShowingDetails} from "@/domains/showings/_schema/showing/ShowingDetailsSchema.ts";
import {ReservationType} from "@noovies-tickets/common";
import {ShowingSelectorInfoCard} from "@/views/client/showings/_comp";
import {ShowingInfoPageHeader} from "@/views/client/showings/_pages/showing-info/header.tsx";
import {ReservationForm, ReservationFormView} from "@/views/client/reservations/_feat/reserve-ticket-form/form";

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
    const navigate = useLoggedNavigate();

    const {_id: showingID, movie: {_id: movieID, title: movieTitle}, theatre: {name: theatreName}, config: {canReserveSeats}} = showing;

    useEffect(() => {
        setTitle(`${movieTitle} • ${theatreName}`);
    }, [movieTitle, theatreName, setTitle]);
    const reservationType: ReservationType = canReserveSeats
        ? "RESERVED_SEATS"
        : "GENERAL_ADMISSION";

    const navigateToReservations = () => {
        navigate({
            to: "/account/profile?activeTab=reservations",
            level: "log",
            component: ShowingInfoPageContent.name,
            message: "User successfully reserved tickets; redirecting to dashboard.",
        });
    };

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