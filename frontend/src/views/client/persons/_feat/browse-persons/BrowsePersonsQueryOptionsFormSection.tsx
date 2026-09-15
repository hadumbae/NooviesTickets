/**
 * @fileoverview Creates the form section component for browsing persons query options.
 */

import {
    BrowsePersonsQueryOptionsForm
} from "@/views/client/persons/_feat/browse-persons/BrowsePersonsQueryOptionsForm.tsx";
import {
    BrowsePersonsQueryOptionsFormView
} from "@/views/client/persons/_feat/browse-persons/BrowsePersonsQueryOptionsFormView.tsx";
import {createQueryOptionsFormSection} from "@/shared/_feat";
import {
    useBrowsePersonsQueryOptionsContext
} from "@/domains/persons/_feat/validate-query-options/person-browse/BrowsePersonsQueryOptionsContext.ts";

/** Form section component for configuring and submitting browse persons query options. */
export const BrowsePersonsQueryOptionsFormSection = createQueryOptionsFormSection({
    queryOptionsForm: BrowsePersonsQueryOptionsForm,
    useQueryOptionsContext: useBrowsePersonsQueryOptionsContext,
    formView: BrowsePersonsQueryOptionsFormView,
});