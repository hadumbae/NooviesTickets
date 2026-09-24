/**
 * @file Duplicate index error handler.
 * handleDuplicateIndexError.ts
 */

import { isDuplicateIndexError } from "./isDuplicateIndexError.js";
import { ValidationError } from "@noovies-tickets/common";

type ErrorParams = {
    error: unknown;
    handleIndex?: (indexString: string) => void | never;
};

/**
 * Normalizes MongoDB duplicate index errors.
 */
export function handleDuplicateIndexError(
    { error, handleIndex }: ErrorParams
): never {
    const isValidError = isDuplicateIndexError(error);

    if (isValidError) {
        const indexString = (error as any).errmsg.match(/index: (\S+)/)?.[1];

        handleIndex?.(indexString);

        throw new ValidationError({
            errorCode: "ERR_DUPLICATE_INDEX",
            message: `Duplicate Error: ${indexString}`,
            statusCode: 422,
            errors: [],
        });
    }

    throw error;
}