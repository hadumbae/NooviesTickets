/**
 * @fileoverview Renders a fieldset component containing sort toggle controls for theatre index query options.
 */

import {ReactElement} from "react";
import {cn, FormViewProps} from "@/shared/_feat";
import {
    TheatreIndexQueryOptionsFormValues
} from "@/domains/theatres/_feat/handle-query-options/theatre-index/TheatreIndexQueryOptionsSchema.ts";
import {HookFormSortToggle} from "@/views/shared/_feat";

/**
 * Renders sort options for ordering theatres by name, country, or postal code within a query options form.
 */
export function TheatreIndexQueryOptionsFormSortFieldset(
    {className, disableFields, hideFields}: FormViewProps<TheatreIndexQueryOptionsFormValues>
): ReactElement {
    return (
        <fieldset className={cn("query-options-fieldset-flex", className)}>
            {
                !hideFields?.sortByName && (
                    <HookFormSortToggle
                        name="sortByName"
                        label="Name"
                        disabled={disableFields?.sortByName}
                    />
                )
            }

            {
                !hideFields?.sortByCountry && (
                    <HookFormSortToggle
                        name="sortByCountry"
                        label="Country"
                        disabled={disableFields?.sortByCountry}
                    />
                )
            }

            {
                !hideFields?.sortByPostalCode && (
                    <HookFormSortToggle
                        name="sortByPostalCode"
                        label="Postal Code"
                        disabled={disableFields?.sortByPostalCode}
                    />
                )
            }
        </fieldset>
    );
}