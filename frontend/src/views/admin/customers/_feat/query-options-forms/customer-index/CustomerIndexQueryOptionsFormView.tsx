/**
 * @fileoverview Form view for managing customer search, filtering, and sorting options.
 */

import {ReactElement} from "react";
import {QueryOptionsFormViewProps} from "@/shared/_feat";
import {CustomerIndexQueryOptionsFormValues} from "@/domains/customers/_types";
import {
    CustomerIndexQueryOptionsFormFilterFieldset
} from "@/views/admin/customers/_feat/query-options-forms/customer-index/CustomerIndexQueryOptionsFormFilterFieldset.tsx";
import {
    CustomerIndexQueryOptionsFormSortFieldset
} from "@/views/admin/customers/_feat/query-options-forms/customer-index/CustomerIndexQueryOptionsFormSortFieldset.tsx";
import {QueryOptionsFormLayout} from "@/views/shared/_feat";

/**
 * Form component for customer index query options that automatically submits on change.
 */
export function CustomerIndexQueryOptionsFormView(
    {disableFields, classNames}: QueryOptionsFormViewProps<CustomerIndexQueryOptionsFormValues>
): ReactElement {
    return (
        <QueryOptionsFormLayout
            filterFieldset={CustomerIndexQueryOptionsFormFilterFieldset}
            sortFieldset={CustomerIndexQueryOptionsFormSortFieldset}
            disableFields={disableFields}
            classNames={classNames}
        />
    );
}