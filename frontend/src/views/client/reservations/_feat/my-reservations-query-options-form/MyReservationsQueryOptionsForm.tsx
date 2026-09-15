/**
 * @fileoverview Form component for managing current user reservation query options.
 */

import {ReactElement, ReactNode} from "react";
import {
    CurrentUserReservationsQueryOptionsFormValues,
    CurrentUserReservationsQueryOptions,
    CurrentUserReservationsQueryOptionsSchema,
    useCurrentUserReservationsQueryOptionsForm
} from "@/domains/reservations/_feat/fetch-current-user-reservations";
import {useGenerateFormID} from "@/shared/_feat/generate-form-keys";
import {useParsedSearchParams} from "@/shared/_feat";
import {BaseFormContextProvider} from "@/shared/_feat/generic-form-context";
import {Form} from "@/views/shared/_comp/ui";

/** Props for the MyReservationsQueryOptionsForm component. */
type FormProps = {
    children: ReactNode;
    presetValues?: Partial<CurrentUserReservationsQueryOptionsFormValues>;
};

/**
 * Form component that synchronises reservation query options with URL search parameters.
 */
export function MyReservationsQueryOptionsForm(
    {children, presetValues}: FormProps
): ReactElement {
    const formID = useGenerateFormID("my-reservations-query-options-form");

    const {searchParams, setSearchParams} = useParsedSearchParams({schema: CurrentUserReservationsQueryOptionsSchema});
    const form = useCurrentUserReservationsQueryOptionsForm({presetValues, editEntity: searchParams});

    const updateOptions = (values: CurrentUserReservationsQueryOptions) => {
        setSearchParams(values);
    }
    
    return (
        <BaseFormContextProvider formID={formID} submitHandler={updateOptions}>
            <Form {...form}>
                <form id={formID} onSubmit={form.handleSubmit(updateOptions)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}