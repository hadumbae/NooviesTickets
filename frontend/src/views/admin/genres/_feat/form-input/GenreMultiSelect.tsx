/**
 * @fileoverview React Hook Form genre multi-select component backed by a genre query.
 */

import {FieldValues} from "react-hook-form";
import {HookFormMultiSelect} from "@/views/shared/_comp/form-select/HookFormMultiSelect.tsx";
import {ReactSelectOption} from "@/shared/_types/input/ReactSelectOption.ts";
import {ReactElement} from "react";
import {QueryDataLoader} from "@/views/shared/_feat";
import {HookFormInputControlProps} from "@/shared/_types/input/HookFormInputProps.ts";
import {useFetchGenres} from "@/domains/genres/_feat/crud-hooks/fetch/useFetchGenres.ts";
import {filterNullishAttributes, GenreSchema, Genre, generateArraySchema, GenreQueryOptions} from "@noovies-tickets/common";

/** Props for the GenreMultiSelect component. */
type SelectProps<TValues extends FieldValues> = Omit<HookFormInputControlProps<TValues>, "control"> & {
    queries?: GenreQueryOptions;
};

/**
 * Form select component that fetches genres and renders a multi-select input.
 */
export function GenreMultiSelect<TValues extends FieldValues>(
    {queries, ...rest}: SelectProps<TValues>
): ReactElement {
    const query = useFetchGenres({
        schema: generateArraySchema(GenreSchema),
        queries: filterNullishAttributes(queries),
    });

    return (
        <QueryDataLoader query={query}>
            {(genres: Genre[]) => {
                const options = genres.map(({_id, name}): ReactSelectOption => ({value: _id, label: name}));

                return (
                    <HookFormMultiSelect options={options} {...rest} />
                );
            }}
        </QueryDataLoader>
    );
}