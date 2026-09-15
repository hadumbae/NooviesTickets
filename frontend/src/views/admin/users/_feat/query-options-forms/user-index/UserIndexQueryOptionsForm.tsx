import {ReactElement} from "react";
import {
    generateQueryFormDefaultValues,
    QueryOptionsFormContainerProps,
    QueryOptionsFormContextProvider,
    useGenerateFormID
} from "@/shared/_feat";
import {UserIndexQueryOptionsFormValues, useUserIndexQueryOptionsForm} from "@/domains/users/_feat/submit-query-options";
import {UserQueryOptions, UserQueryOptionsSchema} from "@/domains/users/_schema/query-options/UserQueryOptionsSchema.ts";
import {Form} from "@/views/shared/_comp/ui";

type FormProps = QueryOptionsFormContainerProps<UserIndexQueryOptionsFormValues, UserQueryOptions>;

export function UserIndexQueryOptionsForm(
    {children, activeOptions, queryOptions, setQueryOptions, presetValues}: FormProps
): ReactElement {
    const formID = useGenerateFormID("user-index-query-options-form");
    const form = useUserIndexQueryOptionsForm({presetValues, queryOptions});

    const defaultValues = generateQueryFormDefaultValues({schema: UserQueryOptionsSchema});
    const resetForm = () => form.reset(defaultValues);

    const updateSearchParams = (values: UserQueryOptions) => {
        setQueryOptions(values);
    };

    return (
        <QueryOptionsFormContextProvider
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
        </QueryOptionsFormContextProvider>
    );
}