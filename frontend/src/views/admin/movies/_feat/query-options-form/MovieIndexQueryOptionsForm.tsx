/**
 * @fileoverview Form component and hook exports for managing movie index query options.
 */

import {createQueryOptionsForm} from "@/shared/_feat";
import {MovieIndexQueryOptionsSchema} from "@/domains/movies/_feat/handle-query-options/movie-index/MovieIndexQueryOptionsSchema.ts";

const {QueryOptionsForm} = createQueryOptionsForm({
    name: "movie-index-query-options-form",
    schema: MovieIndexQueryOptionsSchema,
});

export {
    /** Form component for managing movie index query options. */
        QueryOptionsForm as MovieIndexQueryOptionsForm,
}