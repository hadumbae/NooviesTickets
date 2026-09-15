/**
 * @fileoverview Defines the multi-step form component for submitting showing data.
 */

import {createMultiStepForm} from "@/shared/_feat/forms/create-multi-step-form/createMultiStepForm.tsx";
import {
    ShowingDetails,
    ShowingFormData,
    ShowingFormSchema,
    ShowingFormValues,
} from "@/domains/showings/_schema";
import {ShowingEditData, useShowingSubmitMutation} from "@/domains/showings/_feat";

const {SubmitForm} = createMultiStepForm<
    ShowingFormValues,
    ShowingFormData,
    ShowingEditData,
    ShowingDetails
>({
    formName: "showing-submit-form",
    schema: ShowingFormSchema,
    mutation: useShowingSubmitMutation,
    defaultValues: {
        startAtDate: "",
        startAtTime: "",
        endAtDate: "",
        endAtTime: "",
        ticketPrice: "",
        language: "",
        subtitleLanguages: [],
        movie: "",
        theatre: "",
        screen: "",
        status: "SCHEDULED",
        timezone: "",
        theatreCity: "",
        theatreState: "",
        theatreCountry: undefined,
        config: {
            isActive: true,
            isSpecialEvent: false,
            canReserveSeats: false
        },
    },
});

export {
    /** Multi-step form component for submitting showing creation and update forms. */
        SubmitForm as ShowingSubmitForm,
}