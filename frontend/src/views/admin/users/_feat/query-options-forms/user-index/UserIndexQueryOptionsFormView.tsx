/**
 * @fileoverview View component for the user index query option form.
 */

import {ReactElement} from "react";
import {UserIndexQueryOptionsFormValues} from "@/domains/users/_feat/submit-query-options";
import {
    UserIndexQueryOptionsFormFilterFieldset
} from "@/views/admin/users/_feat/query-options-forms/user-index/UserIndexQueryOptionsFormFilterFieldset.tsx";
import {
    UserIndexQueryOptionsFormSortFieldset
} from "@/views/admin/users/_feat/query-options-forms/user-index/UserIndexQueryOptionsFormSortFieldset.tsx";
import {Button, Separator} from "@/views/shared/_comp/ui";
import {cn, QueryOptionsFormViewProps, useAutoFormSubmit, useQueryOptionsFormContext} from "@/shared/_feat";
import {X} from "lucide-react";

/** Form view for configuring filtering and sorting options for the user index. */
export function UserIndexQueryOptionsFormView(
    {disableFields, classNames}: QueryOptionsFormViewProps<UserIndexQueryOptionsFormValues>
): ReactElement {
    const {submitHandler, resetValues, activeOptions} = useQueryOptionsFormContext();
    useAutoFormSubmit({submitHandler, timeout: 450});

    return (
        <div className={cn("space-y-4", classNames?.container)}>
            <UserIndexQueryOptionsFormFilterFieldset
                disableFields={disableFields}
                className={classNames?.filters}
            />

            <Separator/>

            <div className="flex max-lg:flex-col max-lg:space-y-4 lg:justify-between lg:items-center">
                <UserIndexQueryOptionsFormSortFieldset
                    disableFields={disableFields}
                    className={classNames?.sorts}
                />

                {
                    activeOptions > 0 && (
                        <Button variant="secondary" onClick={resetValues} className="max-lg:w-full">
                            <X/> Clear
                        </Button>
                    )
                }
            </div>

        </div>
    );
}