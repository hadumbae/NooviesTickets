/**
 * @fileoverview Form component and hook for submitting theatre screen data.
 */

import {createForm} from "@/shared/_feat";
import {TheatreScreen} from "@noovies-tickets/common";
import {
    TheatreScreenDetails,
    TheatreScreenFormData,
    TheatreScreenFormSchema,
    TheatreScreenFormValues,
    useTheatreScreenSubmitMutation
} from "@/domains/theatre-screens";

const {SubmitForm} = createForm<
    TheatreScreenFormValues,
    TheatreScreenFormData,
    TheatreScreen,
    TheatreScreenDetails
>({
    formName: "screen-submit-form",
    schema: TheatreScreenFormSchema,
    mutation: useTheatreScreenSubmitMutation,
    defaultValues: {
        name: "",
        capacity: "",
        screenType: undefined,
        theatre: undefined,
    },
});

export {
    /** Form component for submitting theatre screen data. */
        SubmitForm as TheatreScreenForm,
}