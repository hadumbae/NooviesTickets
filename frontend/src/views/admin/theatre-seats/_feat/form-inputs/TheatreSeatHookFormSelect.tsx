/**
 * @fileoverview Hook Form select component for choosing seats, supporting filtering and single/multi-selection.
 */

import {ReactElement} from "react";
import {FieldValues} from "react-hook-form";
import {Loader} from "lucide-react";
import {HookFormSelect} from "@/views/shared/_comp/form-select/HookFormSelect.tsx";
import {ReactSelectOption} from "@/shared/_types/input/ReactSelectOption.ts";
import {buildString} from "@/shared/_feat/formatters/buildString.ts";
import {QueryDataLoader} from "@/views/shared/_feat";
import {generateArraySchema, TheatreSeat, TheatreSeatSchema} from "@noovies-tickets/common";
import {HookFormInputControlProps} from "@/shared/_types/input/HookFormInputProps.ts";

import {TheatreSeatQueryFilters, useFetchTheatreSeats} from "@/domains/theatre-seats";

/** Props for the TheatreSeatHookFormSelect component. */
type SelectProps<TValues extends FieldValues> = Omit<HookFormInputControlProps<TValues>, "control"> & {
    filters?: TheatreSeatQueryFilters;
};

/**
 * Renders a validated selection input for seats that maps query results to form options.
 */
export function TheatreSeatHookFormSelect<TValues extends FieldValues>(
    {filters = {layoutType: "SEAT"}, ...rest}: SelectProps<TValues>
): ReactElement {
    const query = useFetchTheatreSeats({queries: filters, schema: generateArraySchema(TheatreSeatSchema)});

    return (
        <QueryDataLoader query={query} loaderComponent={Loader}>
            {(seats: TheatreSeat[]) => {
                const options = seats.filter(seat => seat.layoutType === "SEAT").map(
                    ({_id, row, seatNumber, x, y, seatLabel}): ReactSelectOption => ({
                        value: _id,
                        label: buildString([
                            `${row} • ${seatNumber}`,
                            seatLabel && `(${seatLabel})`,
                            "|",
                            `(X${x}, Y${y})`,
                        ]),
                    })
                );

                return (
                    <HookFormSelect options={options} {...rest} />
                );
            }}
        </QueryDataLoader>
    );
}
