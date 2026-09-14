/**
 * @fileoverview Container component for managing movie search query parameter forms.
 */

import {ReactElement} from 'react';
import {Form} from "@/views/shared/_comp/ui";
import {
    MovieQueryOptionFormValues,
    useMovieQueryOptionForm
} from "@/domains/movies/_feat/submit-queries";
import {MovieQueryOptions, MovieQueryOptionSchema} from "@/domains/movies/_schema/queries/MovieQueryOptionSchema.ts";
import {
    generateQueryFormDefaultValues,
    QueryOptionFormContainerProps,
    QueryOptionFormContextProvider,
    useGenerateFormID
} from "@/shared/_feat";
import {filterFalsyAttributes} from "@noovies-tickets/common";

type FormContainerProps = QueryOptionFormContainerProps<MovieQueryOptionFormValues, MovieQueryOptions>;

/**
 * Container that synchronises movie query form values with URL search parameters.
 */
export function MovieQueryOptionForm(
    {children, activeOptions, queryOptions, setQueryOptions, presetValues}: FormContainerProps
): ReactElement {
    const formID = useGenerateFormID("movie-query-option-form");
    const form = useMovieQueryOptionForm({presetValues, queryOptions});

    const defaultValues = generateQueryFormDefaultValues({schema: MovieQueryOptionSchema});
    const resetForm = () => form.reset(defaultValues);

    const updateSearchParams = (values: MovieQueryOptions) => {
        const filtered = filterFalsyAttributes(values);
        setQueryOptions(filtered);
    };

    return (
        <QueryOptionFormContextProvider
            formID={formID}
            submitHandler={updateSearchParams}
            resetValues={resetForm}
            activeOptions={activeOptions}
        >
            <Form {...form}>
                <form id={formID} onSubmit={form.handleSubmit(updateSearchParams)}>
                    {children}
                </form>
            </Form>
        </QueryOptionFormContextProvider>
    );
}


