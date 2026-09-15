/**
 * @fileoverview Defines the form component and hook for submitting role type data.
 */

import {createForm} from "@/shared/_feat";
import {RoleTypeFormSchema, useRoleTypeSubmitMutation} from "@/domains/role-types/_feat";

const {SubmitForm} = createForm({
    formName: "role-type-form-schema",
    schema: RoleTypeFormSchema,
    mutation: useRoleTypeSubmitMutation,
    defaultValues: {
        roleName: "",
        department: "",
        category: "",
        description: "",
    },
});

export {
    /** Form component for submitting role type creation and update forms. */
        SubmitForm as RoleTypeSubmitForm,
}