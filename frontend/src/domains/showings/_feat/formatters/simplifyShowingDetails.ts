/**
 * @fileoverview Formatter that transforms a detailed showing object into a simplified showing structure.
 */

import {ValidationError} from "@noovies-tickets/common";
import {Showing, ShowingDetails, ShowingSchema} from "@/domains/showings/_schema";

/** Extracts IDs from nested entities to create a flat showing object and validates it against the schema. */
export function simplifyShowingDetails(data: ShowingDetails): Showing {
    const raw = {
        ...data,
        movie: data.movie._id,
        theatre: data.theatre._id,
        screen: data.screen._id,
    };

    const {data: showing, success, error} = ShowingSchema.safeParse(raw);

    if (!success) {
        const {errors} = error;

        throw new ValidationError({
            errorCode: "ERR_DATA_VALIDATION",
            message: "Unable to simplify showing. Please try again.",
            raw,
            errors,
        });
    }

    return showing;
}
