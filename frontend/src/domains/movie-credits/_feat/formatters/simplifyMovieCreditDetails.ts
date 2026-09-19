/**
 * @fileoverview Utility for transforming complex movie credit objects into a simplified flat structure.
 */

import {MovieCredit, MovieCreditSchema, ValidationError} from "@noovies-tickets/common";
import {MovieCreditDetails} from "@/domains/movie-credits/_schemas";

/** Converts nested movie credit details into a flat MovieCredit object and validates the result. */
export function simplifyMovieCreditDetails(
    {person, movie, roleType, ...rest}: MovieCreditDetails
): MovieCredit {
    const simpleCredit = {
        ...rest,
        movie: movie._id,
        person: person._id,
        roleType: roleType._id,
    };

    const {data, error, success} = MovieCreditSchema.safeParse(simpleCredit);

    if (!success || error || !data) {
        throw new ValidationError({
            errorCode: "ERR_DATA_VALIDATION",
            message: "Failed to simplify movie credit details.",
            errors: error.errors,
            raw: simpleCredit,
        });
    }

    return data;
}
