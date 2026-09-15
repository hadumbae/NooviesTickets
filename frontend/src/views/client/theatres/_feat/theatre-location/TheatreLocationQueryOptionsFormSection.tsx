/**
 * @fileoverview Defines and exports the query option form section for theatre location options.
 */

import {createQueryOptionsFormSection} from "@/shared/_feat";
import {
    TheatreLocationQueryOptionsForm
} from "@/views/client/theatres/_feat/theatre-location/TheatreLocationQueryOptionsForm.tsx";
import {
    useTheatreLocationQueryOptionsContext
} from "@/domains/theatres/_feat/handle-query-options/theatre-location/TheatreLocationQueryOptionsContext.ts";
import {
    TheatreLocationQueryOptionsFormView
} from "@/views/client/theatres/_feat/theatre-location/TheatreLocationQueryOptionsFormView.tsx";

const section = createQueryOptionsFormSection({
    queryOptionsForm: TheatreLocationQueryOptionsForm,
    formView: TheatreLocationQueryOptionsFormView,
    useQueryOptionsContext: useTheatreLocationQueryOptionsContext,
});

export {
    /** Form section component integrating the form and view for theatre location query options. */
        section as TheatreLocationQueryOptionsFormSection
}