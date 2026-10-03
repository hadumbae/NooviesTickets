/**
 * @fileoverview Form view component for the seat details panel in the admin interface.
 */

import {ReactElement} from "react";
import {TheatreSeatSubmitFormActions} from "@/views/admin/theatre-seats/_feat/submit-data/view/TheatreSeatSubmitFormActions.tsx";
import {TheatreSeatSubmitFormView} from "@/views/admin/theatre-seats/_feat/submit-data/view/TheatreSeatSubmitFormView.tsx";
import {DisableFields} from "@/shared/_types";
import {TheatreSeatFormValues} from "@/domains/theatre-seats/_feat/submit-data/schema/TheatreSeatFormSchema.ts";

/** Renders the seat context panel form view containing the "submit" and "reset" buttons. */
export function TheatreSeatContextPanelFormView(): ReactElement {
    const disableFields: DisableFields<TheatreSeatFormValues> = {
        theatre: true,
        screen: true,
    };

    return (
        <div className="space-y-5">
            <TheatreSeatSubmitFormView disableFields={disableFields} isNestedView={true}/>
            <TheatreSeatSubmitFormActions/>
        </div>
    );
}
