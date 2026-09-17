/**
 * @fileoverview Utility for generating Zod schemas for paginated data structures.
 */

import {z, type ZodTypeAny} from "zod";
import {NonNegativeNumberSchema} from "../schema/numbers";

/** Creates a Zod object schema containing a total count and an array of validated items. */
export function generatePaginationSchema<TSchema extends ZodTypeAny>(schema: TSchema) {
    return z.object(
        {
            items: z.array(z.lazy(() => schema), {required_error: "Required", invalid_type_error: "Must Be An Array"}),
            totalItems: NonNegativeNumberSchema,
        },
        {required_error: "Required", invalid_type_error: "Must Be A Pagination Object ({totalItems, items})"}
    );
}
