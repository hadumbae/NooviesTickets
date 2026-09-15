/**
 * @fileoverview Renders the form view component for role type index query options.
 */

import {ReactElement} from "react";
import {QueryOptionsFormViewProps} from "@/shared/_feat";
import {
    RoleTypeIndexQueryOptionsFormValues
} from "@/domains/role-types/_feat/validate-query-options/roletype-index/RoleTypeIndexQueryOptionsSchema.ts";
import {QueryOptionsFormLayout} from "@/views/shared/_feat";
import {
    RoleTypeIndexQueryOptionsFormFilterFieldset
} from "@/views/admin/role-types/_feat/validate-query-options/roletype-index/RoleTypeIndexQueryOptionsFormFilterFieldset.tsx";
import {
    RoleTypeIndexQueryOptionsFormSortFieldset
} from "@/views/admin/role-types/_feat/validate-query-options/roletype-index/RoleTypeIndexQueryOptionsFormSortFieldset.tsx";

/**
 * Renders the layout view for role type index filter and sort form fieldsets.
 */
export function RoleTypeIndexQueryOptionsFormView(
    {disableFields, classNames}: QueryOptionsFormViewProps<RoleTypeIndexQueryOptionsFormValues>
): ReactElement {
    return (
        <QueryOptionsFormLayout
            filterFieldset={RoleTypeIndexQueryOptionsFormFilterFieldset}
            sortFieldset={RoleTypeIndexQueryOptionsFormSortFieldset}
            classNames={classNames}
            disableFields={disableFields}
        />
    );
}