/**
 * @fileoverview Collapsible section providing an inline edit form for a RoleType.
 */

import {RoleTypeSubmitFormActions} from "@/views/admin/role-types/_feat/submit-form/RoleTypeSubmitFormActions.tsx";
import {RoleTypeSubmitFormView} from "@/views/admin/role-types/_feat/submit-form/RoleTypeSubmitFormView.tsx";
import {ReactElement, useState} from 'react';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/views/shared/_comp/ui/collapsible.tsx";
import {ChevronDown, ChevronRight} from "lucide-react";
import {RoleTypeSubmitForm} from "@/views/admin/role-types/_feat/submit-form/RoleTypeSubmitForm.tsx";
import {RoleType} from "@noovies-tickets/common";
import {MutationResponseConfig} from "@/shared/_feat/submit-data/mutationTypes.ts";
import {RoleTypeFormData} from "@/domains/role-types/_feat/submit-data/schema/RoleTypeFormSchema.ts";

/** Props for the RoleTypeListSheetEditCollapsible component. */
type CollapsibleProps = {
    roleType: RoleType;
    onSubmitConfig?: MutationResponseConfig<RoleType, RoleTypeFormData>;
};

/**
 * Collapsible UI block that reveals an inline edit form for a specific RoleType.
 */
export function RoleTypeEditCollapsible(
    {roleType, onSubmitConfig = {}}: CollapsibleProps
): ReactElement {
    const {onSubmitSuccess} = onSubmitConfig;
    const [editOpen, setEditOpen] = useState<boolean>(false);

    const onEditSuccess = (roleType: RoleType) => {
        setEditOpen(false);
        onSubmitSuccess?.(roleType);
    };

    return (
        <Collapsible open={editOpen} onOpenChange={setEditOpen}>
            <CollapsibleTrigger className="primary-text flex items-center space-x-2">
                {editOpen ? <ChevronDown/> : <ChevronRight/>}
                <h1 className="text-md font-bold">Edit Role Type</h1>
            </CollapsibleTrigger>

            <CollapsibleContent className="px-1">
                <RoleTypeSubmitForm editEntity={roleType} {...onSubmitConfig} onSubmitSuccess={onEditSuccess}>
                    <div className="space-y-3">
                        <RoleTypeSubmitFormView/>
                        <RoleTypeSubmitFormActions submitButtonText="Edit"/>
                    </div>
                </RoleTypeSubmitForm>
            </CollapsibleContent>
        </Collapsible>
    );
}
