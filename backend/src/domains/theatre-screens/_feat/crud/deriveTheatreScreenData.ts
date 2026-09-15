/**
 * @fileoverview Utility for resolving and mapping theatre references during screen data creation or updates.
 */

import type {ZodIssue} from "zod";
import {TheatreModel} from "@/domains/theatres/_models/theatre";
import {RequestValidationError} from "@/shared/_errors/RequestValidationError";
import type {TheatreScreenInputData} from "@/domains/theatre-screens/_feat/validate-submit/TheatreScreenInputSchema";
import type {TheatreScreenSchemaFields} from "@/domains/theatre-screens/_models/theatre-screen/TheatreScreen.types";

/** Resolves and validates theatre details from screen input data. */
export async function deriveTheatreScreenData(
    input: Partial<TheatreScreenInputData>
): Promise<Partial<TheatreScreenSchemaFields>> {
    const theatreDocument = await TheatreModel.findById(input.theatre);

    if (!theatreDocument) {
        const error: ZodIssue = {code: "custom", path: ["theatre"], message: "Invalid theatre."};

        throw new RequestValidationError({
            errors: [error],
            statusCode: 422,
            raw: input,
            message: "Invalid Theatre TheatreScreen Input Data."
        });
    }

    return {
        theatre: theatreDocument._id,
    }
}