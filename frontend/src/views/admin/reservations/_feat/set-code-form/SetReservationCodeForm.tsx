/**
 * @fileoverview Form component and hook exports for setting a reservation code query option.
 */

import {createQueryOptionForm} from "@/shared/_feat";
import {FetchByCodeSearchParamsSchema} from "@/domains/reservations/_feat/fetch-reservation-by-code/reservation-query-options-form";

const {QueryOptionsForm} = createQueryOptionForm({
    schema: FetchByCodeSearchParamsSchema,
    name: "set-reservation-code-form",
});

export {
    /** Form component for setting the reservation code query option. */
        QueryOptionsForm as SetReservationCodeForm,
}