/**
 * @fileoverview Breadcrumb navigation components for the customer reservations management interface.
 */

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/views/shared/_comp/ui/breadcrumb.tsx";
import {LoggedLink} from "@/views/shared/_feat/navigation/LoggedLink.tsx";
import {ReactElement} from "react";
import {ObjectIdString} from "@noovies-tickets/common";
import {UserUniqueCode} from "@/domains/users/_schema/fields/UserUniqueCodeSchema.ts";

/** Props for the CustomerReservationsPageBreadcrumbs component. */
type NavProps = {
    customerID: ObjectIdString;
    customerName: string;
    customerCode: UserUniqueCode;
};

/**
 * Renders the hierarchical breadcrumb navigation trail for a customer's reservation history view.
 */
export function CustomerReservationsPageBreadcrumbs(
    {customerID, customerName, customerCode}: NavProps
): ReactElement {
    return (
        <nav aria-label="Breadcrumbs">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <LoggedLink
                            className="breadcrumb-link"
                            to={`/admin/customers`}
                        >
                            Customers
                        </LoggedLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator/>

                    <BreadcrumbItem>
                        <LoggedLink
                            className="breadcrumb-link"
                            to={`/admin/customers/${customerID}`}
                        >
                            {customerName} • {customerCode}
                        </LoggedLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator/>

                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            Reservations
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </nav>
    );
}