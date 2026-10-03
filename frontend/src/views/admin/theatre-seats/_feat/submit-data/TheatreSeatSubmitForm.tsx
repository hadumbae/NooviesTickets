/**
 * @fileoverview Defines the form component and hook for submitting seat data.
 */

import {createForm} from "@/shared/_feat";
import {TheatreSeat} from "@noovies-tickets/common";
import {TheatreSeatDetails, TheatreSeatFormData, TheatreSeatFormSchema, TheatreSeatFormValues, useTheatreSeatSubmitMutation} from "@/domains/theatre-seats";

const {SubmitForm} = createForm<
    TheatreSeatFormValues,
    TheatreSeatFormData,
    TheatreSeat,
    TheatreSeatDetails
>({
    schema: TheatreSeatFormSchema,
    formName: "seat-submit-form",
    mutation: useTheatreSeatSubmitMutation,
    defaultValues: {
        layoutType: "SEAT",
        row: "",
        x: 1,
        y: 1,
        theatre: undefined,
        screen: undefined,
        seatNumber: 1,
        seatLabel: "",
        seatType: "REGULAR",
        isAvailable: true,
        priceMultiplier: 1,
    }
});

export {
    /** Form component for submitting seat creation and update forms. */
        SubmitForm as TheatreSeatSubmitForm,
}
