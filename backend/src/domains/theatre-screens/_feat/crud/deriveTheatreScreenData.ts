/**
 * @fileoverview Utility for resolving and mapping theatre references during screen data creation or updates.
 */

import {ValidationError} from "@noovies-tickets/common";
import {TheatreModel} from "@/domains/theatres/_models/theatre";
import type {TheatreScreenInputData} from "@/domains/theatre-screens/_feat/validate-submit/TheatreScreenInputSchema";
import type {TheatreScreenSchemaFields} from "@/domains/theatre-screens/_models/theatre-screen/TheatreScreen.types";

/** Resolves and validates theatre details from screen input data. */
export async function deriveTheatreScreenData(
    input: Partial<TheatreScreenInputData>
): Promise<Partial<TheatreScreenSchemaFields>> {
    const theatreDocument = await TheatreModel.findById(input.theatre);

    if (!theatreDocument) {
        throw new ValidationError({
            errorCode: "ERR_REQUEST_VALIDATION",
            raw: input,
            message: "Invalid Theatre TheatreScreen Input Data.",
            statusCode: 422,
            errors: [{
                code: "custom",
                path: ["theatre"],
                message: "Invalid Theatre",
            }],
        });
    }

    return {
        theatre: theatreDocument._id,
    }
}