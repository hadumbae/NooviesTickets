/**
 * @fileoverview Renders the form view layout for person index query options.
 */

import {ReactElement} from "react";
import {QueryOptionsFormLayout} from "@/views/shared/_feat";
import {
    PersonIndexQueryOptionsFormFilterFieldset
} from "@/views/admin/persons/_feat/query-options-form/person-index/PersonIndexQueryOptionsFormFilterFieldset.tsx";
import {
    PersonIndexQueryOptionsFormSortFieldset
} from "@/views/admin/persons/_feat/query-options-form/person-index/PersonIndexQueryOptionsFormSortFieldset.tsx";
import {QueryOptionsFormViewProps} from "@/shared/_feat";
import {CustomerIndexQueryOptionsFormValues} from "@/domains/customers";

/**
 * Renders the filter and sort fieldsets for person index query options using the query option form layout.
 */
export function PersonIndexQueryOptionsFormView(
    {disableFields, hideFields, classNames}: QueryOptionsFormViewProps<CustomerIndexQueryOptionsFormValues>
): ReactElement {
    return (
        <QueryOptionsFormLayout
            filterFieldset={PersonIndexQueryOptionsFormFilterFieldset}
            sortFieldset={PersonIndexQueryOptionsFormSortFieldset}
            disableFields={disableFields}
            hideFields={hideFields}
            classNames={classNames}
        />
    );
}