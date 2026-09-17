/**
 * @fileoverview Defines the form component and hook for submitting seat data.
 */

import {createForm} from "@/shared/_feat";
import {Seat} from "@noovies-tickets/common";
import {SeatDetails, SeatFormData, SeatFormSchema, SeatFormValues, useSeatSubmitMutation} from "@/domains/seats";

const {SubmitForm} = createForm<
    SeatFormValues,
    SeatFormData,
    Seat,
    SeatDetails
>({
    schema: SeatFormSchema,
    formName: "seat-submit-form",
    mutation: useSeatSubmitMutation,
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
        SubmitForm as SeatSubmitForm,
}