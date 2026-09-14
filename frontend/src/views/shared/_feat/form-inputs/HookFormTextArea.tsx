/**
 * @fileoverview A reusable textarea component integrated with react-hook-form.
 */

import {ReactElement} from "react";
import {ControllerProps, FieldValues, useFormContext} from "react-hook-form";
import {cn} from "@/shared/_feat";
import {HookFormInputControlProps} from "@/shared/_types/input/HookFormInputProps.ts";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Textarea
} from "@/views/shared/_comp/ui";

/**
 * A form textarea component that uses react-hook-form's Controller for state management.
 */
export function HookFormTextArea<TValues extends FieldValues>(
    {name, label, description, placeholder, classNames}: Omit<HookFormInputControlProps<TValues>, "control">
): ReactElement {
    const {control} = useFormContext<TValues>();

    const renderField: ControllerProps<TValues>["render"] = ({field}) => (
        <FormItem className={classNames?.container}>
            {label && <FormLabel className={cn("primary-text", classNames?.label)}>{label}</FormLabel>}

            <FormControl>
                <Textarea
                    placeholder={placeholder || label}
                    className={cn("resize-none h-28", classNames?.input)}
                    {...field}
                />
            </FormControl>

            {description && <FormDescription>{description}</FormDescription>}

            <FormMessage/>
        </FormItem>
    );

    return (
        <FormField control={control} name={name} render={renderField}/>
    );
}
