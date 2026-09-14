/**
 * @fileoverview Form select component for genres integrated with React Hook Form.
 */

import {ReactElement} from "react";
import {FieldValues} from "react-hook-form";
import {HookFormSelect} from "@/views/shared/_comp/form-select/HookFormSelect.tsx";
import {ReactSelectOption} from "@/shared/_types/input/ReactSelectOption.ts";
import {
    filterNullishAttributes
} from "@noovies-tickets/common";
import {QueryDataLoader} from "@/views/shared/_feat";
import {HookFormInputControlProps} from "@/shared/_types/input/HookFormInputProps.ts";
import {generateArraySchema} from "@noovies-tickets/common";
import {Genre, GenreQueryOptions, GenreSchema} from "@/domains/genres/_schema";
import {useFetchGenres} from "@/domains/genres/_feat/crud-hooks/fetch/useFetchGenres.ts";

/** Props for the GenreMultiSelect component. */
type SelectProps<TValues extends FieldValues> = Omit<HookFormInputControlProps<TValues>, "control"> & {
    queries?: GenreQueryOptions;
};

/**
 * Fetches genres and renders a single or multi-select input for use within a form.
 */
export function GenreSelect<TValues extends FieldValues>(
    {queries, ...rest}: SelectProps<TValues>
): ReactElement {
    const query = useFetchGenres({
        schema: generateArraySchema(GenreSchema),
        queries: filterNullishAttributes(queries)
    });

    return (
        <QueryDataLoader query={query}>
            {(genres: Genre[]) => {
                const options = genres.map(({_id, name}): ReactSelectOption => ({value: _id, label: name}));

                return (
                    <HookFormSelect options={options} {...rest} />
                );
            }}
        </QueryDataLoader>
    );
}