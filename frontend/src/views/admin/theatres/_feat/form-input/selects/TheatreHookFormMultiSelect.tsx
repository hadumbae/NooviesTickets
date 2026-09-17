/**
 * @fileoverview A multi-select form component for selecting multiple theatres from a fetched list.
 */

import {ReactElement} from "react";
import {FieldValues} from "react-hook-form";
import {Loader} from "lucide-react";
import {ReactSelectOption} from "@/shared/_types/input/ReactSelectOption.ts";
import {QueryDataLoader} from "@/views/shared/_feat";
import {HookFormMultiSelect} from "@/views/shared/_comp/form-select/HookFormMultiSelect.tsx";
import {HookFormInputControlProps} from "@/shared/_types/input/HookFormInputProps.ts";
import {generateArraySchema, Theatre, TheatreSchema} from "@noovies-tickets/common";
import {TheatreQueryOptions} from "@/domains/theatres/_feat/handle-query-options/options/TheatreQueryOptionsSchema.ts";
import {useFetchTheatres} from "@/domains/theatres/_feat/crud-hooks/fetch/useFetchTheatres.ts";

/** Props for the TheatreHookFormMultiSelect component. */
type HookProps<TSubmit extends FieldValues> = HookFormInputControlProps<TSubmit> & {
    filters?: TheatreQueryOptions;
};

/**
 * A react-hook-form multi-select component that automatically fetches theatre options.
 */
export function TheatreHookFormMultiSelect<TSubmit extends FieldValues>(
    props: HookProps<TSubmit>
): ReactElement {
    const {disabled, filters} = props;

    const query = useFetchTheatres({
        schema: generateArraySchema(TheatreSchema),
        queries: filters,
    });

    return (
        <QueryDataLoader query={query} loaderComponent={Loader}>
            {(theatres: Theatre[]) => {
                const options: ReactSelectOption[] = theatres.map(
                    (theatre): ReactSelectOption => ({label: theatre.name, value: theatre._id}),
                );

                return (
                    <HookFormMultiSelect<TSubmit>
                        {...props}
                        options={options}
                        disabled={disabled}
                    />
                );
            }}
        </QueryDataLoader>
    );
}