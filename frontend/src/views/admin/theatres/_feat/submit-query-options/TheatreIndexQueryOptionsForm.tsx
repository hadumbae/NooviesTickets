/**
 * @fileoverview Defines the form component and hook for managing theatre index query options.
 */

import {createQueryOptionForm} from "@/shared/_feat";
import {
    TheatreIndexQueryOptionsSchema
} from "@/domains/theatres/_feat/handle-query-options/theatre-index/TheatreIndexQueryOptionsSchema.ts";

const {QueryOptionsForm} = createQueryOptionForm({
    name: "theatre-index-query-options-form",
    schema: TheatreIndexQueryOptionsSchema,
});

export {
    /** React form component for configuring theatre index query options. */
        QueryOptionsForm as TheatreIndexQueryOptionsForm,
}