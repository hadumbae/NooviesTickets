/**
 * @fileoverview A reusable, type-safe file input component integrated with React Hook Form.
 */
import {ReactElement, useEffect, useRef} from "react";
import {ControllerRenderProps, FieldValues, useFormContext} from "react-hook-form";
import {cn} from "@/common/_feat";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input} from "@/views/common/_comp/ui";
import {HookFormFileInputProps, HookFormInputControlProps} from "@/common/_types/input/HookFormInputProps.ts";

/** Props for the HookFormFileInput component. */
type FileInputProps<TValues extends FieldValues> =
    Omit<HookFormInputControlProps<TValues>, "control"> &
    Omit<HookFormFileInputProps, "type">;

/** Props for the FileInputField renderer, combining the RHF field with display options. */
type FileInputFieldProps<TValues extends FieldValues> =
    Omit<FileInputProps<TValues>, "name"> & {
    field: ControllerRenderProps<TValues>;
};

/**
 * Renders the actual file input control for a single React Hook Form field.
 *
 * @remarks
 * Kept as its own component (rather than inlined into the `render` prop) so its hooks
 * follow the Rules of Hooks — a `render` prop is invoked as a plain function by RHF's
 * Controller, not mounted as a component, so hooks called directly inside it run outside
 * React's component boundary.
 */
function FileInputField<TValues extends FieldValues>(
    {field: {value, onChange, ...fieldProps}, label, description, disabled, classNames, multiple, hasLabel}: FileInputFieldProps<TValues>
): ReactElement {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!value && inputRef.current) {
            inputRef.current.value = "";
        }
    }, [value]);

    return (
        <FormItem className={classNames?.container}>
            {hasLabel && <FormLabel className={cn("primary-text", classNames?.label)}>{label}</FormLabel>}

            <FormControl>
                <Input
                    className={classNames?.input}
                    type="file"
                    disabled={disabled}
                    multiple={multiple}
                    onChange={(event) =>
                        onChange(
                            event.target.files &&
                            (multiple ? event.target.files : event.target.files[0])
                        )
                    }
                    {...fieldProps}
                />
            </FormControl>

            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage/>
        </FormItem>
    );
}

/**
 * A file input field bound to React Hook Form that supports single or multiple file selection.
 */
export function HookFormFileInput<TValues extends FieldValues>(
    {name, label, description, disabled, classNames, multiple = false, hasLabel = true}: FileInputProps<TValues>
): ReactElement {
    const {control} = useFormContext<TValues>();

    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FileInputField
                    field={field}
                    label={label}
                    description={description}
                    disabled={disabled}
                    classNames={classNames}
                    multiple={multiple}
                    hasLabel={hasLabel}
                />
            )}
        />
    );
}
