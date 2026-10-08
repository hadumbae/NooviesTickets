/**
 * @fileoverview Page container that fetches and displays a specific reservation based on route parameters.
 */

import {useSetPageTitle} from "@/shared/_feat";
import {SlugRouteParamObject} from "@/shared/_schemas/route/SlugRouteParamSchema.ts";
import {MyReservationPageContent} from "@/views/client/users/my-reservation-page/MyReservationPageContent.tsx";
import {useFetchReservationBySlug} from "@/domains/reservations/_feat/crud-hooks";
import {QueryDataLoader} from "@/views/shared/_feat";
import {PopulatedReservation, PopulatedReservationSchema} from "@/domains/reservations/_schema/model";
import {ReactElement} from "react";
import {useLoaderData} from "react-router-dom";

/**
 * Displays the details of a specific reservation identified by its slug.
 */
export function MyReservationPage(): ReactElement {
    const {setTitle} = useSetPageTitle({presetTitle: "My Reservation"});

    const {slug} = useLoaderData<SlugRouteParamObject>();

    const query = useFetchReservationBySlug({
        slug,
        config: {populate: true, virtuals: true},
        schema: PopulatedReservationSchema,
    });

    return (
        <QueryDataLoader query={query}>
            {(reservation: PopulatedReservation) => (
                <MyReservationPageContent
                    reservation={reservation}
                    setTitle={setTitle}
                />
            )}
        </QueryDataLoader>
    );
}
