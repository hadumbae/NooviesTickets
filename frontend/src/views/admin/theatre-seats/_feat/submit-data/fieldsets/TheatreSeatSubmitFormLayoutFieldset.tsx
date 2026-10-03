/**
 * @fileoverview Fieldset component for the seat submission form handling the selection of seat layout types via radio buttons.
 */

import {ReactElement} from 'react';
import {Separator} from "@/views/shared/_comp/ui";
import {cn} from "@/shared/_feat";
import {FormFieldsetProps} from "@/shared/_feat/submit-data/formTypes.ts";
import {TheatreSeatLayoutTypeRadioGroup} from "@/views/admin/theatre-seats/_feat/form-inputs";
import {TheatreSeatFormValues} from "@/domains/theatre-seats";

/** Renders the layout type fieldset containing the radio group selection. */
export function TheatreSeatSubmitFormLayoutFieldset(
    {disableFields, hideFields, className}: FormFieldsetProps<TheatreSeatFormValues>
): ReactElement {
    return (
        <fieldset className={cn("space-y-4", className)}>
            <div>
                <h3 className="fieldset-header">Layout Type</h3>
                <Separator/>
            </div>

            {!hideFields?.layoutType && (
                <TheatreSeatLayoutTypeRadioGroup
                    name="layoutType"
                    label="Layout Type"
                    className="flex space-x-5"
                    disabled={disableFields?.layoutType}
                />
            )}
        </fieldset>
    );
}
