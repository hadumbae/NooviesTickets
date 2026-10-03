/**
 * @fileoverview Pure view component for the seat submission form, rendering dynamic fieldsets and action buttons.
 */

import {cloneElement, ReactElement} from "react";
import {cn} from "@/shared/_feat/handle-ui/cn.ts";
import {FormFieldsetProps} from "@/shared/_feat/submit-data/formTypes.ts";
import {TheatreSeatFormValues} from "@/domains/theatre-seats/_feat/submit-data/schema/TheatreSeatFormSchema.ts";
import {useFormContext} from "react-hook-form";
import {HookFormFieldsetConfig} from "@/shared/_types/form/HookFormFieldsetConfigTypes.ts";
import {TheatreSeatSubmitFormCoordinateFieldset} from "@/views/admin/theatre-seats/_feat/submit-data/fieldsets/TheatreSeatSubmitFormCoordinateFieldset.tsx";
import {TheatreSeatSubmitFormDetailsFieldset} from "@/views/admin/theatre-seats/_feat/submit-data/fieldsets/TheatreSeatSubmitFormDetailsFieldset.tsx";
import {TheatreSeatSubmitFormLayoutFieldset} from "@/views/admin/theatre-seats/_feat/submit-data/fieldsets/TheatreSeatSubmitFormLayoutFieldset.tsx";
import {TheatreSeatSubmitFormNonSeatFieldset} from "@/views/admin/theatre-seats/_feat/submit-data/fieldsets/TheatreSeatSubmitFormNonSeatFieldset.tsx";
import {TheatreSeatSubmitFormRowFieldset} from "@/views/admin/theatre-seats/_feat/submit-data/fieldsets/TheatreSeatSubmitFormRowFieldset.tsx";
import {TheatreSeatSubmitFormSeatFieldset} from "@/views/admin/theatre-seats/_feat/submit-data/fieldsets/TheatreSeatSubmitFormSeatFieldset.tsx";

type ViewProps = FormFieldsetProps<TheatreSeatFormValues> & {
    isNestedView?: boolean;
}

/**
 * Renders the structural layout of the seat form, including conditional fieldsets and submission controls.
 */
export function TheatreSeatSubmitFormView(
    {disableFields, hideFields, className, isNestedView}: ViewProps
): ReactElement {
    const {watch} = useFormContext();

    const layoutType = watch("layoutType");
    const isSeat = layoutType === "SEAT";

    const fieldGroups: HookFormFieldsetConfig<TheatreSeatFormValues>[] = [
        {
            render: true,
            key: "layout-1",
            fields: ["layoutType"],
            element: (
                <TheatreSeatSubmitFormLayoutFieldset
                    hideFields={hideFields}
                    disableFields={disableFields}
                />
            )
        },
        {
            render: true,
            key: "details-2",
            fields: ["theatre", "screen"],
            element: (
                <TheatreSeatSubmitFormDetailsFieldset
                    hideFields={hideFields}
                    disableFields={disableFields}
                    isNestedView={isNestedView}
                />
            )
        },
        {
            render: !isSeat,
            key: "non-seat-3",
            fields: ["row", "x", "y"],
            element: (
                <TheatreSeatSubmitFormNonSeatFieldset
                    hideFields={hideFields}
                    disableFields={disableFields}
                    isNestedView={isNestedView}
                />
            )
        },
        {
            render: isSeat,
            key: "row-3",
            fields: ["row", "seatNumber", "seatLabel"],
            element: (
                <TheatreSeatSubmitFormRowFieldset
                    hideFields={hideFields}
                    disableFields={disableFields}
                    isNestedView={isNestedView}
                />
            )
        },
        {
            render: isSeat,
            key: "coordinates-4",
            fields: ["x", "y"],
            element: (
                <TheatreSeatSubmitFormCoordinateFieldset
                    hideFields={hideFields}
                    disableFields={disableFields}
                />
            )
        },
        {
            render: isSeat,
            key: "seat-5",
            fields: ["seatType", "priceMultiplier", "isAvailable"],
            element: (
                <TheatreSeatSubmitFormSeatFieldset
                    hideFields={hideFields}
                    disableFields={disableFields}
                    isNestedView={isNestedView}
                />
            )
        },
    ];

    return (
        <div className={cn("space-y-4", className)}>
            {
                fieldGroups.map(({render, fields, key, element}) =>
                    render && fields.some((field) => !hideFields?.[field])
                        ? cloneElement(element, {key})
                        : null
                )
            }
        </div>
    );
}
