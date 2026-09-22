/**
 * @fileoverview Utility for normalising populated theatre screen entities into a flat schema.
 */


import {TheatreScreen, TheatreScreenSchema, ValidationError} from "@noovies-tickets/common";
import {
    PopulatedTheatreScreen,
    TheatreScreenDetails,
    TheatreScreenWithVirtuals
} from "@/domains/theatre-screens/_schema/model";

/**
 * Normalises complex screen objects into a flat structure by extracting the theatre ID.
 */
export function simplifyTheatreScreenDetails(
    {theatre, ...rem}: TheatreScreen | PopulatedTheatreScreen | TheatreScreenWithVirtuals | TheatreScreenDetails
): TheatreScreen {
    const raw = {
        ...rem,
        theatre: typeof theatre === "string"
            ? theatre
            : theatre._id
    };

    const {success, error, data} = TheatreScreenSchema.safeParse(raw);

    if (!success) {
        throw new ValidationError({
            errorCode: "ERR_DATA_VALIDATION",
            message: "Failed to simplify screen details. Invalid values.",
            raw,
            errors: error?.errors,
        });
    }

    return data;
}