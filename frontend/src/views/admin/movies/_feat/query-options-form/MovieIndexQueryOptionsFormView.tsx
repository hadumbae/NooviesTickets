/**
 * @fileoverview Layout view component for the movie index query option form.
 */

import {ReactElement} from "react";
import {QueryOptionsFormViewProps} from "@/shared/_feat";
import {MovieQueryOptionsFormValues} from "@/domains/movies/_feat/submit-queries/MovieQueryOptionsFormValues.ts";
import {QueryOptionsFormLayout} from "@/views/shared/_feat";
import {
    MovieIndexQueryOptionsFormFilterFieldset
} from "@/views/admin/movies/_feat/query-options-form/MovieIndexQueryOptionsFormFilterFieldset.tsx";
import {
    MovieIndexQueryOptionsFormSortFieldset
} from "@/views/admin/movies/_feat/query-options-form/MovieIndexQueryOptionsFormSortFieldset.tsx";

/** Renders the combined filter and sort fieldsets for movie index query options. */
export function MovieIndexQueryOptionsFormView(
    {classNames, disableFields, hideFields}: QueryOptionsFormViewProps<MovieQueryOptionsFormValues>
): ReactElement {
    return (
        <QueryOptionsFormLayout
            filterFieldset={MovieIndexQueryOptionsFormFilterFieldset}
            sortFieldset={MovieIndexQueryOptionsFormSortFieldset}
            disableFields={disableFields}
            hideFields={hideFields}
            classNames={classNames}
        />
    );
}