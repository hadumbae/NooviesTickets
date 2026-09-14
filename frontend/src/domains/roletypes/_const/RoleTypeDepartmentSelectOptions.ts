/**
 * @fileoverview Converts role type department constants into select option objects for UI dropdown components.
 */

import {ReactSelectOption} from "@/shared/_types";
import {RoleTypeDepartmentConstant} from "@noovies-tickets/common";

/** Select option list mapped from role type department constants for dropdown components. */
export const RoleTypeDepartmentSelectOptions: ReactSelectOption[] = RoleTypeDepartmentConstant.map(
    (department): ReactSelectOption => ({label: department, value: department})
);