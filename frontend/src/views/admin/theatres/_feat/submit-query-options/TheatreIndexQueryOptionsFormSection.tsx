/**
 * @fileoverview Creates the form section component for managing theatre index query options.
 */

import {createQueryOptionsFormSection} from "@/shared/_feat";
import {
    TheatreIndexQueryOptions,
    TheatreIndexQueryOptionsFormValues,
    useTheatreIndexQueryOptionsContext
} from "@/domains/theatres/_feat/handle-query-options/theatre-index";
import {
    TheatreIndexQueryOptionsFormView
} from "@/views/admin/theatres/_feat/submit-query-options/TheatreIndexQueryOptionsFormView.tsx";
import {
    TheatreIndexQueryOptionsForm
} from "@/views/admin/theatres/_feat/submit-query-options/TheatreIndexQueryOptionsForm.tsx";

const section = createQueryOptionsFormSection<
    TheatreIndexQueryOptionsFormValues,
    TheatreIndexQueryOptions
>({
    useQueryOptionsContext: useTheatreIndexQueryOptionsContext,
    formView: TheatreIndexQueryOptionsFormView,
    queryOptionsForm: TheatreIndexQueryOptionsForm
});

/** Form section component for filtering and sorting theatres in the index view. */
export {
    section as TheatreIndexQueryOptionsFormSection,
}