/**
 * @fileoverview Utility for building type-safe route parameter loaders with Zod validation.
 */

import {z, ZodTypeAny} from "zod";
import {LoaderFunction, LoaderFunctionArgs, redirect} from "react-router-dom";
import {toast} from "react-toastify";

/** Props for the BuilderConfig type. */
type BuilderConfig<TSchema extends ZodTypeAny> = {
    schema: TSchema
    redirectTo: string;
    onErrorMessage?: string;
}

/**
 * Builds a React Router loader function that validates route parameters against a Zod schema.
 */
export function buildRouteParamLoader<TSchema extends ZodTypeAny>(
    {schema, redirectTo, onErrorMessage}: BuilderConfig<TSchema>
): LoaderFunction {
    return  ({params}: LoaderFunctionArgs): z.infer<typeof schema> => {
        const {data, success} = schema.safeParse(params);

        if (!success) {
            toast.error(onErrorMessage ?? "Invalid Params.");
            throw redirect(redirectTo);
        }

        return data;
    }
}