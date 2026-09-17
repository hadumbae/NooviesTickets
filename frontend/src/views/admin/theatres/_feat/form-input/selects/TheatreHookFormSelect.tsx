/**
 * @fileoverview A form select component that fetches and displays theatre options.
 */

import {ReactElement} from "react";
import {FieldValues} from "react-hook-form";
import {Loader} from "lucide-react";
import {HookFormSelect} from "@/views/shared/_comp/form-select/HookFormSelect.tsx";
import {ReactSelectOption} from "@/shared/_types/input/ReactSelectOption.ts";
import {QueryDataLoader} from "@/views/shared/_feat";
import {FormSelectOnChangeHandler} from "@/shared/_types";
import {HookFormInputControlProps} from "@/shared/_types/input/HookFormInputProps.ts";
import {FormSelectValueHandler} from "@/shared/_types/form/value";
import {generateArraySchema, Theatre, TheatreSchema} from "@noovies-tickets/common";

import {useFetchTheatres} from "@/domains/theatres/_feat/crud-hooks/fetch/useFetchTheatres.ts";
import {TheatreQueryOptions} from "@/domains/theatres/_feat/handle-query-options/options/TheatreQueryOptionsSchema.ts";

/** Props for the TheatreHookFormSelect component. */
type HookProps<TSubmit extends FieldValues> = Omit<HookFormInputControlProps<TSubmit>, "control"> & {
    filters?: TheatreQueryOptions;
    onValueChange?: (theatre: Theatre | null) => void;
};

/** A controlled select input that populates its options from the theatre fetch query. */
export function TheatreHookFormSelect<TSubmit extends FieldValues>(
    {onValueChange, filters, ...rest}: HookProps<TSubmit>
): ReactElement {
    const query = useFetchTheatres({
        schema: generateArraySchema(TheatreSchema),
        queries: filters,
    });

    return (
        <QueryDataLoader query={query} loaderComponent={Loader}>
            {(theatres: Theatre[]) => {
                const options: ReactSelectOption<Theatre>[] = theatres.map(
                    (theatre): ReactSelectOption<Theatre> => ({label: theatre.name, value: theatre}),
                );

                const handleOnChange: FormSelectOnChangeHandler<TSubmit, Theatre> = (val, field) => {
                    field.onChange(val?.value._id);
                    onValueChange?.(val?.value ?? null);
                };

                const handleValue: FormSelectValueHandler<TSubmit, Theatre> = (options, field) => {
                    return options.find(o => o.value._id === field.value) ?? null;
                };

                return (
                    <HookFormSelect<TSubmit, Theatre>
                        {...rest}
                        handleOnChange={handleOnChange}
                        handleValue={handleValue}
                        options={options}
                    />
                );
            }}
        </QueryDataLoader>
    );
}