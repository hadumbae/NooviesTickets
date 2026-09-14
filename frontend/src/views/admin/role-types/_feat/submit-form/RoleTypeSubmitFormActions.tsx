/**
 * @fileoverview Action buttons for the Role Type submission form.
 */

import {ReactElement} from "react";
import {Button} from "@/views/shared/_comp/ui/button.tsx";
import {useBaseFormContext} from "@/shared/_feat/generic-form-context";
import {AnimatedLoader} from "@/views/shared/_comp/loaders/AnimatedLoader.tsx";

/** Props for the RoleTypeSubmitFormActions component. */
type ActionProps = {
    className?: string;
    submitButtonText?: string;
};

/**
 * Renders the submit button for the Role Type form.
 */
export function RoleTypeSubmitFormActions(
    {className, submitButtonText}: ActionProps
): ReactElement {
    const {formID, isPending} = useBaseFormContext();

    return (
        <div className={className}>
            <Button form={formID} variant="primary" className="w-full" disabled={isPending} type="submit">
                {isPending ? <AnimatedLoader/> : submitButtonText ?? "Submit"}
            </Button>
        </div>
    );
}