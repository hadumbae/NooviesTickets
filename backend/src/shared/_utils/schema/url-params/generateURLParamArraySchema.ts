/**
 * @fileoverview Utility for generating Zod schemas that preprocess and validate URL query parameters into typed arrays.
 */

import {z, type ZodTypeAny} from "zod";

/** Generates a Zod schema that coerces stringified or standard array inputs into a typed array of the provided schema. */
export function generateURLParamArraySchema<TSchema extends ZodTypeAny>(schema: TSchema) {
    const preprocessToArray = (value: any) => {
        if (Array.isArray(value)) return value;

        if (typeof value === "string") {
            try {
                const parsed = JSON.parse(value);
                return Array.isArray(parsed) ? parsed : undefined;
            } catch (e: any) {
                return undefined;
            }
        }

        return undefined;
    };

    return z
        .preprocess(preprocessToArray, z.array(schema, {invalid_type_error: "Must be an array."}))
        .optional();
}