/**
 * @fileoverview Form view component for configuring theatre index query options.
 */

import {ReactElement} from "react";
import {QueryOptionsFormViewProps} from "@/shared/_feat";
import {
    TheatreIndexQueryOptionsFormValues
} from "@/domains/theatres/_feat/handle-query-options/theatre-index/TheatreIndexQueryOptionsSchema.ts";
import {QueryOptionsFormLayout} from "@/views/shared/_feat";
import {
    TheatreIndexQueryOptionsFormFilterFieldset
} from "@/views/admin/theatres/_feat/submit-query-options/TheatreIndexQueryOptionsFormFilterFieldset.tsx";
import {
    TheatreIndexQueryOptionsFormSortFieldset
} from "@/views/admin/theatres/_feat/submit-query-options/TheatreIndexQueryOptionsFormSortFieldset.tsx";

/**
 * Renders the layout view for theatre index filter and sort form fieldsets.
 */
export function TheatreIndexQueryOptionsFormView(
    {classNames, disableFields}: QueryOptionsFormViewProps<TheatreIndexQueryOptionsFormValues>
): ReactElement {
    return (
        <QueryOptionsFormLayout
            filterFieldset={TheatreIndexQueryOptionsFormFilterFieldset}
            sortFieldset={TheatreIndexQueryOptionsFormSortFieldset}
            disableFields={disableFields}
            classNames={classNames}
        />
    );
}