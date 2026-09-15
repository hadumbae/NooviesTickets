/**
 * @fileoverview Form view component for rendering genre index query filter and sort fieldsets.
 */

import {ReactElement} from "react";
import {QueryOptionsFormViewProps} from "@/shared/_feat";
import {
    GenreIndexQueryOptionsFormValues
} from "@/domains/genres/_feat/handle-query-options/genre-index/GenreIndexQueryOptionsSchema.ts";
import {
    GenreIndexQueryOptionsFormFilterFieldset
} from "@/views/admin/genres/_feat/submit-query-options/genre-index/GenreIndexQueryOptionsFormFilterFieldset.tsx";
import {
    GenreIndexQueryOptionsFormSortFieldset
} from "@/views/admin/genres/_feat/submit-query-options/genre-index/GenreIndexQueryOptionsFormSortFieldset.tsx";
import {QueryOptionsFormLayout} from "@/views/shared/_feat";

/** Form view that combines filter and sort fieldsets for genre index query options. */
export function GenreIndexQueryOptionsFormView(
    {classNames, hideFields, disableFields}: QueryOptionsFormViewProps<GenreIndexQueryOptionsFormValues>
): ReactElement {
    return (
        <QueryOptionsFormLayout
            filterFieldset={GenreIndexQueryOptionsFormFilterFieldset}
            sortFieldset={GenreIndexQueryOptionsFormSortFieldset}
            hideFields={hideFields}
            disableFields={disableFields}
            classNames={classNames}
        />
    );
}