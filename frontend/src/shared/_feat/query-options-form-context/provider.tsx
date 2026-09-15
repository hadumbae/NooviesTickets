/**
 * @fileoverview Provider component for the query option form context.
 */

import {ReactElement, ReactNode} from "react";
import {
    QueryOptionsFormContext,
    QueryOptionsFormContextValues
} from "@/shared/_feat/query-options-form-context/context.ts";

/** Props for the QueryOptionsFormContextProvider component. */
type ProviderProps = QueryOptionsFormContextValues & {
    children: ReactNode;
};

/** Context provider that manages and distributes query option form state. */
export function QueryOptionsFormContextProvider(
    {children, ...values}: ProviderProps
): ReactElement {
    return (
        <QueryOptionsFormContext.Provider value={values}>
            {children}
        </QueryOptionsFormContext.Provider>
    );
}