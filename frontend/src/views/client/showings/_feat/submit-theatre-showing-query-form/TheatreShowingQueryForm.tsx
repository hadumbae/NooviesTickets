/**
 * @fileoverview Container component for the Theatre Showing query form.
 *
 */

import {ReactElement, ReactNode} from "react";
import {Form} from "@/views/shared/_comp/ui";
import {useParsedSearchParams} from "@/shared/_feat/fetch-search-params";
import {BaseFormContextProvider} from "@/shared/_feat/generic-form-context";
import {useTheatreScheduleQueryForm} from "@/domains/showings/_feat/submit-theatre-schedule-query/useTheatreScheduleQueryForm.ts";
import {ShowingsPageQueryFormValues} from "@/domains/movies/_feat/manage-showing-page/ShowingsPageQueryFormValues.ts";
import {
    ShowingsPageQueryStrings,
    ShowingsPageQueryStringSchema
} from "@/domains/movies/_feat/client-view-data/schemas/ShowingsPageQueryStringSchema.ts";
import {useGenerateFormID} from "@/shared/_feat/generate-form-keys";

/** Props for the TheatreShowingQueryForm component. */
type FormParams = {
    children: ReactNode;
    presetValues?: Partial<ShowingsPageQueryFormValues>;
}

/** Form container that synchronises theatre showing filters with URL search parameters. */
export function TheatreShowingQueryForm(
    {children, presetValues}: FormParams
): ReactElement {
    const formID = useGenerateFormID("theatre-showing-query-form");

    const form = useTheatreScheduleQueryForm({presetValues});
    const {setSearchParams} = useParsedSearchParams({schema: ShowingsPageQueryStringSchema});

    const updateParams = (values: ShowingsPageQueryFormValues) => {
        setSearchParams(values as ShowingsPageQueryStrings);
    };

    return (
        <BaseFormContextProvider formID={formID} submitHandler={updateParams}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(updateParams)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}
