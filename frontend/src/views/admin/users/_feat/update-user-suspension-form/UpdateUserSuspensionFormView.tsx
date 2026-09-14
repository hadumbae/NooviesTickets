/**
 * @fileoverview Form view component rendering input controls for updating user suspension state.
 */

import {ReactElement} from "react";
import {useFormContext} from "react-hook-form";
import {cn} from "@/shared/_feat";
import {DisableFields, HideFields} from "@/shared/_types";
import {HookFormSelect} from "@/views/shared/_comp";
import {HookFormCheckbox, HookFormInput} from "@/views/shared/_feat";
import {UserSuspensionUpdateActionSelectOptions} from "@/domains/users/_feat/manage-user-suspension/const";
import {UpdateUserSuspensionFormValues} from "@/domains/users/_feat/manage-user-suspension/schema";

/** Props for the UpdateUserSuspensionFormView component. */
type ViewProps = {
    className?: string;
    hideFields?: HideFields<UpdateUserSuspensionFormValues>;
    disableFields?: DisableFields<UpdateUserSuspensionFormValues>;
};

/**
 * Renders the form fields required for updating a user's suspension status within a React Hook Form context.
 */
export function UpdateUserSuspensionFormView(
    {className, disableFields, hideFields}: ViewProps
): ReactElement {
    const {control} = useFormContext();

    return (
        <div className={cn("space-y-4", className)}>
            {
                !hideFields?.action &&
                <HookFormSelect
                    name="action"
                    label="Action"
                    options={UserSuspensionUpdateActionSelectOptions}
                    disabled={disableFields?.action}
                />
            }

            {
                !hideFields?.suspend &&
                <HookFormCheckbox
                    name="suspend"
                    label="Suspend?"
                    disabled={disableFields?.suspend}
                />
            }

            {
               !hideFields?.message &&
               <HookFormInput
                   name="message"
                   label="Message"
                   control={control}
                    disabled={disableFields?.message}
               />
            }
        </div>
    );
}