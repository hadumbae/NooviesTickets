/**
 * @fileoverview Zod schema definitions and types for database query pagination parameters.
 */

import {z} from "zod";
import {PositiveNumberSchema, preprocessToNumber} from "@noovies-tickets/common";
import {getEnvVariables} from "@/shared/_feat";

const {PAGINATION_PAGE_DEFAULT, PAGINATION_PER_PAGE_DEFAULT} = getEnvVariables();

/** Schema for validating and parsing query pagination parameters with environment-based defaults. */
export const QueryPaginationParamsSchema = z.object({
    page: preprocessToNumber(PositiveNumberSchema.optional())
        .optional()
        .default(Number(PAGINATION_PAGE_DEFAULT))
        .catch(Number(PAGINATION_PAGE_DEFAULT)),

    perPage: preprocessToNumber(PositiveNumberSchema.optional())
        .optional()
        .default(Number(PAGINATION_PER_PAGE_DEFAULT))
        .catch(Number(PAGINATION_PER_PAGE_DEFAULT)),
});

/** Parsed type representation for query pagination parameters. */
export type QueryPaginationParams = z.infer<typeof QueryPaginationParamsSchema>;
