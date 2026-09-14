/**
 * @fileoverview Presentational view for the Theatre submission form.
 */

import {ReactElement} from 'react';
import {cn} from "@/shared/_feat";
import {FormViewProps} from "@/shared/_feat/submit-data/formTypes.ts";
import {TheatreFormValues} from "@/domains/theatres/_feat/submit-data/schema.ts";
import {
    TheatreSubmitFormDetailsFieldset,
    TheatreSubmitFormLocationFieldset,
} from "@/views/admin/theatres/_feat/submit-data/fieldsets";

/** Renders the UI layout for creating or updating a theatre. */
export function TheatreSubmitFormView(
    {className, disableFields, hideFields}: FormViewProps<TheatreFormValues>
): ReactElement {
    return (
        <div className={cn("space-y-4", className)}>
            <TheatreSubmitFormDetailsFieldset disableFields={disableFields}/>
            {!hideFields?.location && <TheatreSubmitFormLocationFieldset/>}
        </div>
    );
}