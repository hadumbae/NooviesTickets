/**
 * @fileoverview Utility function to convert a fully populated seat details object into a simplified seat object.
 */


import {Seat, SeatSchema, ValidationError} from "@noovies-tickets/common";
import {SeatDetails} from "@/domains/seats/_schema/model";

/** Converts a fully populated seat details object into a simplified seat object. */
export function simplifySeatDetails(seat: Seat | SeatDetails): Seat {
    const {theatre, screen, ...rem} = seat;

    const dataObject = {
        ...rem,
        theatre: typeof theatre === "string" ? theatre : theatre._id,
        screen: typeof screen === "string" ? screen : screen._id
    };

    const {success, error, data} = SeatSchema.safeParse(dataObject);

    if (!success) {
        const {errors} = error;

        throw new ValidationError({
            errorCode: "ERR_DATA_VALIDATION",
            message: "Invalid Seat Object. Please try again.",
            errors,
            raw: dataObject,
        });
    }

    return data;
}