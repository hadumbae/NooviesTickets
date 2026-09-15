/**
 * @fileoverview Fieldset containing filter inputs for the user index query options form.
 */

import {ReactElement} from "react";
import {FormFieldsetProps} from "@/shared/_feat/submit-data/formTypes.ts";
import {UserIndexQueryOptionsFormValues} from "@/domains/users/_feat/submit-query-options";
import {HookFormInput} from "@/views/shared/_feat";
import {useFormContext} from "react-hook-form";
import {LabelledFormInput} from "@/views/admin/movies/_comp/form-display/LabelledFormInput.tsx";
import {cn} from "@/shared/_feat";
import {HookFormMultiSelect} from "@/views/shared/_comp";
import {UserRoleSelectOptions} from "@/domains/users/_const/UserRoleSelectOptions.ts";

/** Props for the UserIndexQueryOptionsFormFilterFieldset component. */
type FieldsetProps = Omit<FormFieldsetProps<UserIndexQueryOptionsFormValues>, "isNestedView">;

/**
 * Renders a set of filter inputs for searching users by name, email, or unique code.
 */
export function UserIndexQueryOptionsFormFilterFieldset(
    {className, disableFields}: FieldsetProps
): ReactElement {
    const {control} = useFormContext();

    return (
        <fieldset className={cn("grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4", className)}>
            {
                !disableFields?.name &&
                <LabelledFormInput label="Name">
                    <HookFormInput name="name" control={control}/>
                </LabelledFormInput>
            }

            {
                !disableFields?.email &&
                <LabelledFormInput label="Email">
                    <HookFormInput name="email" control={control}/>
                </LabelledFormInput>
            }

            {
                !disableFields?.roles &&
                <LabelledFormInput label="Roles">
                    <HookFormMultiSelect name="roles" options={UserRoleSelectOptions}/>
                </LabelledFormInput>
            }

            {
                !disableFields?.uniqueCode &&
                <LabelledFormInput label="Unique Code" classNames={{
                    container: "col-span-1 md:col-span-3 xl:col-span-1",
                }}>
                    <HookFormInput name="uniqueCode" control={control}/>
                </LabelledFormInput>
            }
        </fieldset>
    );
}