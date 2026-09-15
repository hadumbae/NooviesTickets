/**
 * @fileoverview Custom React hook for managing the Genre Query Option form.
 *
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {GenreQueryOptionsFormStarter} from "@/domains/genres/_feat/query-form/form/schema.ts";
import {GenreQueryOptionsSchema} from "@/domains/genres/_schema";

/** Parameters for the useGenreQueryOptionsForm hook. */
type QueryOptionsFormParams = {
    presetValues?: Partial<GenreQueryOptionsFormStarter>;
};

/** Initializes a React Hook Form instance for genre query filtering. */
export function useGenreQueryOptionsForm(
    params: QueryOptionsFormParams = {}
): UseFormReturn<GenreQueryOptionsFormStarter> {
    const {presetValues} = params;
    const {name, sortByName} = presetValues ?? {};

    const defaultValues: GenreQueryOptionsFormStarter = {
        name: name ?? "",
        sortByName: sortByName ?? "",
    };

    return useForm<GenreQueryOptionsFormStarter>({
        resolver: zodResolver(GenreQueryOptionsSchema),
        defaultValues,
    });
}