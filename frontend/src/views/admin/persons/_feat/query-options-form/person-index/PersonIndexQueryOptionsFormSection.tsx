/**
 * @fileoverview Form section configuration combining context, form state, and view for person index query options.
 */

import {
    PersonIndexQueryOptionsForm
} from "@/views/admin/persons/_feat/query-options-form/person-index/PersonIndexQueryOptionsForm.tsx";
import {
    usePersonIndexQueryOptionsContext
} from "@/domains/persons/_feat/validate-query-options/person-index/PersonIndexQueryOptionsContext.ts";
import {createQueryOptionsFormSection} from "@/shared/_feat";
import {
    PersonIndexQueryOptionsFormView
} from "@/views/admin/persons/_feat/query-options-form/person-index/PersonIndexQueryOptionsFormView.tsx";

const section = createQueryOptionsFormSection({
    queryOptionsForm: PersonIndexQueryOptionsForm,
    useQueryOptionsContext: usePersonIndexQueryOptionsContext,
    formView: PersonIndexQueryOptionsFormView,
});

/** Form section component for managing and displaying person index query options. */
export {
    section as PersonIndexQueryOptionsFormSection,
}