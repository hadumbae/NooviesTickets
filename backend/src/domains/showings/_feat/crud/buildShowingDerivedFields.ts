/**
 * @fileoverview Utility functions for calculating and building derived fields for showing domain entities.
 */

import type {ShowingInput, ShowingSchemaFields} from "@/domains/showings";
import {createTheatreSnapshot} from "@/domains/theatres/_utils";
import {ValidationError} from "@noovies-tickets/common";

/** Constructs derived fields such as theatre snapshots required for showing documents. */
export async function buildShowingDerivedFields(data: Partial<ShowingInput>): Promise<Partial<ShowingSchemaFields>> {
    if (data.theatre === undefined) {
        throw new ValidationError({
            errorCode: "ERR_REQUEST_VALIDATION",
            message: "Theatre Is Required",
            raw: data,
            statusCode: 422,
            errors: [{
                code: "custom",
                message: "Theatre Is Required",
                path: ["theatre"],
            }],
        });
    }

    return {
        theatreSnapshot: await createTheatreSnapshot(data.theatre)
    };
}