/**
 * @fileoverview Utility function for parsing JSON strings with integrated error handling.
 */

import {JSONParseError} from "../../errors/JSONParseError";

type ParseOrThrowParams = {
    raw: string;
    statusCode?: number;
    message?: string;
};

/** Parses a JSON string and throws a structured error if parsing fails. */
export function parseJSON<TData = unknown>(
    {raw, statusCode, message}: ParseOrThrowParams
): TData {
    try {
        return JSON.parse(raw);
    } catch {
        throw new JSONParseError({raw, statusCode, message});
    }
}