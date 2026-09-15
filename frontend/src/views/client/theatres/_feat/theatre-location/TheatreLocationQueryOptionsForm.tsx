/**
 * @fileoverview Form component and hook for managing theatre location query options state.
 */

import {createQueryOptionsForm} from "@/shared/_feat";
import {TheatreLocationQueryOptionsSchema} from "@/domains/theatres/_feat/handle-query-options/theatre-location/TheatreLocationQueryOptionsSchema.ts";

const {QueryOptionsForm} = createQueryOptionsForm({
    schema: TheatreLocationQueryOptionsSchema,
    name: "theatre-location-query-options-form",
});

export {
    /** Form component for editing theatre location query options. */
        QueryOptionsForm as TheatreLocationQueryOptionsForm,
}