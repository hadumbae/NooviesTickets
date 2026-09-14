/**
 * @fileoverview Smart container for the Customer Profile page in the Admin dashboard.
 */

import {ReactElement} from "react";
import {QueryDataLoader} from "@/views/shared/_feat";
import {CustomerProfileOverviewRouteParamsSchema} from "@/domains/customers/_feat/profile-overview/schema/routeParamsSchema.ts";
import {CustomerProfileViewData} from "@/domains/customers/_feat/profile-overview/schema/viewDataSchema.ts";
import {useFetchCustomerProfileViewData} from "@/domains/customers/_feat/profile-overview/fetch/useFetchCustomerProfileViewData.ts";
import {CustomerProfilePageContent} from "@/views/admin/customers/_pages/customer-profile-page/content.tsx";
import {useRouteParams} from "@/shared/_feat";

/**
 * Orchestrates data fetching and validation for the Customer Profile view.
 */
export function CustomerProfilePage(): ReactElement {
    const {customerID} = useRouteParams({
        schema: CustomerProfileOverviewRouteParamsSchema,
        errorConfig: {description: "Valid Customer ID Is Required."},
    });

    const query = useFetchCustomerProfileViewData({customerID});

    return (
        <QueryDataLoader query={query}>
            {({customer, reservation, review}: CustomerProfileViewData) => (
                <CustomerProfilePageContent
                    customer={customer}
                    reservations={reservation.items}
                    reviews={review.items}
                    reservationCount={reservation.total}
                    reviewCount={review.total}
                />
            )}
        </QueryDataLoader>
    );
}