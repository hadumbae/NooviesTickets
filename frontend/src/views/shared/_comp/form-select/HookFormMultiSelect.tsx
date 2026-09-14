/**
 * @fileoverview A reusable, type-safe multi-select component integrated with React Hook Form.
 */

import Select from "react-select";
import {Controller, FieldValues, useFormContext} from "react-hook-form";
import {ReactSelectOption} from "@/shared/_types/input/ReactSelectOption.ts";
import {FormControl, FormDescription, FormItem, FormLabel,} from "@/views/shared/_comp/ui/form.tsx";
import {HookFormErrorMessage} from "@/views/shared/_feat/form-inputs/HookFormErrorMessage.tsx";
import {cn} from "@/shared/_feat";
import {ReactSelectMultiStyleConfig} from "@/shared/_const/css/ReactSelectCSS.ts";
import {FormMultiSelectOnChangeHandler, FormSelectValueHandler} from "@/shared/_types";
import {ReactElement} from "react";
import {HookFormInputControlProps} from "@/shared/_types/input/HookFormInputProps.ts";

/** Props for the HookFormMultiSelect component. */
type MultiSelectProps<TSubmit extends FieldValues, TValue = any> =
    Omit<HookFormInputControlProps<TSubmit>, "control"> & {
    options: ReactSelectOption[];
    handleOnChange?: FormMultiSelectOnChangeHandler<TSubmit, TValue>;
    handleValue?: FormSelectValueHandler<TSubmit, TValue, ReactSelectOption<TValue>[]>;
};

/**
 * A multi-select form field component using react-select and React Hook Form.
 */
export function HookFormMultiSelect<TSubmit extends FieldValues>(
    props: MultiSelectProps<TSubmit>
): ReactElement {
    const {
        name,
        label,
        description,
        placeholder,
        disabled,
        className,
        options = [],
        hasLabel = true,
        handleOnChange,
        handleValue,
    } = props;

    const {control} = useFormContext<TSubmit>();

    return (
        <Controller
            control={control}
            name={name}
            render={({field, fieldState: {error}}) => {
                const id = `select-multi-${name}`;

                return (
                    <FormItem className={cn(className)}>
                        {hasLabel && <FormLabel htmlFor={id} className="primary-text">{label}</FormLabel>}

                        <FormControl>
                            <Select
                                options={options}
                                isMulti={true}
                                value={
                                    handleValue
                                        ? handleValue(options, field)
                                        : options.filter(v => field.value?.includes(v.value))
                                }
                                onChange={val => {
                                    const values = val.map(v => v.value);

                                    if (handleOnChange) {
                                        handleOnChange(values, field)
                                    } else {
                                        field.onChange(values ?? null)
                                    }
                                }}
                                placeholder={placeholder}
                                isDisabled={disabled}
                                classNames={ReactSelectMultiStyleConfig}
                                unstyled={true}
                            />
                        </FormControl>

                        {description && <FormDescription>{description}</FormDescription>}

                        <HookFormErrorMessage error={error}/>
                    </FormItem>
                );
            }}
        />
    );
}
