/**
 * @fileoverview Presentation layer for the reservation lookup interface.
 */

import {ReactElement, useEffect} from "react";
import {PageFlexWrapper} from "@/views/shared/_comp/page";
import {Separator} from "@/views/shared/_comp/ui/separator.tsx";
import {EmptyArrayContainer} from "@/views/shared/_comp/text-display/EmptyArrayContainer.tsx";

import {AdminReservation, ReservationUniqueCode} from "@/domains/reservations/_schema";
import {
    useFetchReservationByCodeQueryOptionsContext
} from "@/domains/reservations/_feat/fetch-reservation-by-code/reservation-query-options-form/FetchReservationByCodeQueryOptionsContext.ts";
import {SetReservationCodeForm, SetReservationCodeFormCard} from "@/views/admin/reservations/_feat";
import {ReservationByCodePageHeader} from "@/views/admin/reservations/_pages/reservation-by-code/headers";
import {ReservationByCodeDataContent} from "@/views/admin/reservations/_pages/reservation-by-code/data.tsx";

/** Props for the ReservationByCodePageContent component. */
type ContentProps = {
    code: ReservationUniqueCode | null;
    reservation: AdminReservation | null;
    setTitle: (title: string) => void;
};

/** Renders the layout and sections for the reservation-by-code feature. */
export function ReservationByCodePageContent(
    {reservation, setTitle}: ContentProps
): ReactElement {
    const {values, setValues, activeOptions} = useFetchReservationByCodeQueryOptionsContext();

    useEffect(() => {
        setTitle(reservation?.uniqueCode ?? "Invalid Reservation");
    }, [setTitle, reservation]);

    return (
        <PageFlexWrapper>
            <ReservationByCodePageHeader/>

            <section className="flex justify-center">
                <div className="max-md:flex-1 lg:w-1/2">
                    <SetReservationCodeForm
                        queryOptions={values}
                        setQueryOptions={setValues}
                        activeOptions={activeOptions}
                    >
                        <SetReservationCodeFormCard/>
                    </SetReservationCodeForm>
                </div>
            </section>

            <Separator/>

            {
                reservation
                    ? <ReservationByCodeDataContent reservation={reservation}/>
                    : <EmptyArrayContainer text="Enter A Valid Code To Look Up Reservations" className="flex-1"/>
            }
        </PageFlexWrapper>
    );
}