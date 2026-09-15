/**
 * @fileoverview Form section configuration combining context, form state, and view for movie index query options.
 */

import {createQueryOptionsFormSection} from "@/shared/_feat";
import {
    useMovieIndexQueryOptionsContext
} from "@/domains/movies/_feat/handle-query-options/movie-index/MovieIndexQueryOptionsContext.ts";
import {MovieIndexQueryOptionsForm} from "@/views/admin/movies/_feat/query-options-form/MovieIndexQueryOptionsForm.tsx";
import {
    MovieIndexQueryOptionsFormView
} from "@/views/admin/movies/_feat/query-options-form/MovieIndexQueryOptionsFormView.tsx";

const section = createQueryOptionsFormSection({
    queryOptionsForm: MovieIndexQueryOptionsForm,
    formView: MovieIndexQueryOptionsFormView,
    useQueryOptionsContext: useMovieIndexQueryOptionsContext,
});

/** Form section component for managing and displaying movie index query options. */
export {
    section as MovieIndexQueryOptionsFormSection,
}