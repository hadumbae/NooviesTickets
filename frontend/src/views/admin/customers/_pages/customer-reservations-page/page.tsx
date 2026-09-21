/**
 * @fileoverview Page component that displays and manages a customer's reservation history with pagination.
 */

import {useParsedPaginationValue} from "@/shared/_feat/fetch-pagination-search-params";
import {QueryDataLoader} from "@/views/shared/_feat";
import {useRouteParams, useSetAdminPageTitle} from "@/shared/_feat";
import {
    CustomerReservationsRouteParamsSchema,
    useFetchCustomerReservationsViewData
} from "@/domains/customers/_feat/manage-reservations";
import {CustomerReservationsPageContent} from "@/views/admin/customers/_pages/customer-reservations-page/content.tsx";

const RESERVATIONS_PER_PAGE = 10;

/**
 * Renders the customer reviews and reservations management page.
 */
export function CustomerReservationsPage() {
    const {setTitle} = useSetAdminPageTitle({presetTitle: "Customer Reservations"})

    const {customerID} = useRouteParams({
        schema: CustomerReservationsRouteParamsSchema,
        errorConfig: {description: "Valid Customer ID Is Required."},
    });

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    const query = useFetchCustomerReservationsViewData({
        pagination: {page, perPage: RESERVATIONS_PER_PAGE},
        customerID,
    });

    return (
        <QueryDataLoader query={query}>
            {({customer, reservations: {items, totalItems}}) => (
                <CustomerReservationsPageContent
                    customer={customer}
                    reservations={items}
                    totalItems={totalItems}
                    page={page}
                    perPage={RESERVATIONS_PER_PAGE}
                    setPage={setPage}
                    setTitle={setTitle}
                />
            )}
        </QueryDataLoader>
    );
}