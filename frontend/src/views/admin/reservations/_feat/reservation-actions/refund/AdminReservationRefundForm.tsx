/**
 * @fileoverview Form component and hook exports for refunding an admin reservation.
 */

import {createForm} from "@/shared/_feat";
import {AdminReservation} from "@/domains/reservations/_schema/model/admin-reservations";
import {
    UpdateReservationNotesFormData,
    UpdateReservationNotesFormDataSchema,
    UpdateReservationNotesFormValues,
} from "@/domains/reservations/_feat/update-reservations/forms";
import {
    useRefundReservationMutation,
    UseRefundReservationMutationConfig
} from "@/domains/reservations/_feat/update-reservations/mutations";

const {SubmitForm} = createForm<
    UpdateReservationNotesFormValues,
    UpdateReservationNotesFormData,
    unknown,
    AdminReservation,
    UseRefundReservationMutationConfig
>({
    schema: UpdateReservationNotesFormDataSchema,
    formName: "admin-reservation-refund-form",
    mutation: useRefundReservationMutation,
    defaultValues: {
        notes: "",
    }
});

export {
    /** Form component for processing an admin reservation refund. */
        SubmitForm as AdminReservationRefundForm,
}