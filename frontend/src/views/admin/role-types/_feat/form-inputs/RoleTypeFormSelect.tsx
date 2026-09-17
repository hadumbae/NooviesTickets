/**
 * @fileoverview Form select input component for choosing a role type.
 */

import {ReactElement} from "react";
import {HookFormInputControlProps, ReactSelectOption, RequestOptions} from "@/shared/_types";
import {generateArraySchema, RoleType, RoleTypeSchema} from "@noovies-tickets/common";
import {QueryDataLoader} from "@/views/shared/_feat";
import {AnimatedLoader, HookFormSelect} from "@/views/shared/_comp";
import {FieldValues} from "react-hook-form";
import {RoleTypeQueryFilters, useFetchRoleTypes} from "@/domains/role-types/_feat";

type SelectProps<TFormValues extends FieldValues> = Omit<HookFormInputControlProps<TFormValues>, "control"> & {
    filters?: Partial<RoleTypeQueryFilters>;
    config?: RequestOptions;
};

/**
 * Form select component for picking a role type from fetched options.
 */
export function RoleTypeFormSelect<TFormValues extends FieldValues>(
    {filters, config, ...inputProps}: SelectProps<TFormValues>
): ReactElement {
    const query = useFetchRoleTypes({
        schema: generateArraySchema(RoleTypeSchema),
        queries: filters,
        config,
    });

    return (
        <QueryDataLoader query={query} loaderComponent={AnimatedLoader}>
            {(roleTypes: RoleType[]) => {
                const options = roleTypes.map((p): ReactSelectOption => ({value: p._id, label: p.roleName}));

                return (
                    <HookFormSelect
                        {...inputProps}
                        options={options}
                    />
                )
            }}
        </QueryDataLoader>
    );
}