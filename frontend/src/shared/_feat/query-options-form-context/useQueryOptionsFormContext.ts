/**
 * @fileoverview Custom hook for accessing the query option form context.
 */

import {useContext} from "react";
import {QueryOptionsFormContext} from "@/shared/_feat/query-options-form-context/context.ts";

/**
 * Returns the current query option form context.
 * Must be used within a QueryOptionsFormContext provider.
 */
export function useQueryOptionsFormContext() {
    const ctx = useContext(QueryOptionsFormContext);

    if (ctx === null) {
        throw new Error(`Must be used within a provider for the "${QueryOptionsFormContext.displayName}" context.`);
    }

    return ctx;
}