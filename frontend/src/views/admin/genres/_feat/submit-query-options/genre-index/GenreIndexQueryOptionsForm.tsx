/**
 * @fileoverview Form component and hook exports for managing genre index query option form state.
 */

import {createQueryOptionForm} from "@/shared/_feat";
import {
    GenreIndexQueryOptionsSchema
} from "@/domains/genres/_feat/handle-query-options/genre-index/GenreIndexQueryOptionsSchema.ts";

const {QueryOptionsForm} = createQueryOptionForm({
    schema: GenreIndexQueryOptionsSchema,
    name: "genre-index-query-options-form",
});

export {
    /** Form component for genre index query options. */
        QueryOptionsForm as GenreIndexQueryOptionsForm,
}