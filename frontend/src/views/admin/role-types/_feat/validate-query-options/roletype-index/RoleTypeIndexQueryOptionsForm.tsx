/**
 * @fileoverview Defines the form component and hook for managing role type index query options.
 */

import {createQueryOptionForm} from "@/shared/_feat";
import {
    RoleTypeIndexQueryOptionsSchema
} from "@/domains/role-types/_feat/validate-query-options/roletype-index/RoleTypeIndexQueryOptionsSchema.ts";

const {QueryOptionsForm} = createQueryOptionForm({
    schema: RoleTypeIndexQueryOptionsSchema,
    name: "role-type-index-query-options-form"
});

export {
/** React form component for configuring role type index query options. */
    QueryOptionsForm as RoleTypeIndexQueryOptionsForm,
}