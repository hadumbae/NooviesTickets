import {createQueryOptionsFormSection} from "@/shared/_feat";
import {
    useGenreIndexQueryOptionsContext
} from "@/domains/genres/_feat/handle-query-options/genre-index/GenreIndexQueryOptionsContext.ts";
import {
    GenreIndexQueryOptionsForm
} from "@/views/admin/genres/_feat/submit-query-options/genre-index/GenreIndexQueryOptionsForm.tsx";
import {
    GenreIndexQueryOptionsFormView
} from "@/views/admin/genres/_feat/submit-query-options/genre-index/GenreIndexQueryOptionsFormView.tsx";

const section = createQueryOptionsFormSection({
    useQueryOptionsContext: useGenreIndexQueryOptionsContext,
    queryOptionsForm: GenreIndexQueryOptionsForm,
    formView: GenreIndexQueryOptionsFormView,
});

export {
    section as GenreIndexQueryOptionsFormSection,
}