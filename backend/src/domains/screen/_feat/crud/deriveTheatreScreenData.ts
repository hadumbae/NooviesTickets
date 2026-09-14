/**
 * @fileoverview Utility for resolving and mapping theatre references during screen data creation or updates.
 */

import type {ZodIssue} from "zod";
import {TheatreModel} from "@/domains/theatre/model/theatre";
import {RequestValidationError} from "@/shared/errors/RequestValidationError";
import type {ScreenInputData} from "@/domains/screen/_feat/validate-submit/ScreenInputSchema";
import type {ScreenSchemaFields} from "@/domains/screen/_models/screen/Screen.types";

/** Resolves and validates theatre details from screen input data. */
export async function deriveTheatreScreenData(
    input: Partial<ScreenInputData>
): Promise<Partial<ScreenSchemaFields>> {
    const theatreDocument = await TheatreModel.findById(input.theatre);

    if (!theatreDocument) {
        const error: ZodIssue = {code: "custom", path: ["theatre"], message: "Invalid theatre."};

        throw new RequestValidationError({
            errors: [error],
            statusCode: 422,
            raw: input,
            message: "Invalid Theatre Screen Input Data."
        });
    }

    return {
        theatre: theatreDocument._id,
    }
}