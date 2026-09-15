/**
 * @fileoverview Defines the form component and hook for submitting theatre data.
 */

import {createForm} from "@/shared/_feat";
import {Theatre} from "@/domains/theatres/_schema/theatre/TheatreSchema.ts";
import {TheatreEditData, TheatreFormValues} from "@/domains/theatres/_feat/submit-data";
import {TheatreFormData} from "@/domains/theatres/_feat/submit-data/schema.ts";
import {useTheatreSubmitMutation} from "@/domains/theatres/_feat/crud-hooks/submit/useTheatreSubmitMutation.ts";
import {TheatreFormSchema} from "@/domains/theatres/_feat/submit-data/schema.ts";

const {SubmitForm} = createForm<
    TheatreFormValues,
    TheatreFormData,
    TheatreEditData,
    Theatre
>({
    formName: "theatre-submit-form",
    mutation: useTheatreSubmitMutation,
    schema: TheatreFormSchema,
    defaultValues: {
        name: "",
        seatCapacity: "",
        location: {
            street: "",
            city: "",
            state: "",
            country: "",
            postalCode: "",
            timezone: "",
            includeCoordinates: false,
            coordinates: {
                type: "Point",
                coordinates: [
                    "",
                    "",
                ],
            },
        },
    }
});

export {
    /** Form component for submitting theatre creation and update forms. */
        SubmitForm as TheatreSubmitForm,
}