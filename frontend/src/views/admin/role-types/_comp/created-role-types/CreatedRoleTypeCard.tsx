/**
 * @fileoverview Card component for displaying and removing a created role type.
 */

import {ReactElement} from "react";
import {RoleType} from "@/domains/role-types/_schema/model/RoleTypeSchema.ts";
import {Button} from "@/views/shared/_comp/ui/button.tsx";
import {ObjectIdString} from "@noovies-tickets/common";
import {X} from "lucide-react";

/** Props for the CreatedRoleTypeCard component. */
type CardProps = {
    roleType: RoleType;
    removeType: (_id: ObjectIdString) => void;
};

/**
 * Displays a role type name with a removal action button.
 */
export function CreatedRoleTypeCard(
    {roleType, removeType}: CardProps
): ReactElement {
    const {_id, roleName} = roleType;

    return (
        <div className="border rounded-lg py-2 px-3 flex justify-between items-center">
            <span className="secondary-text">{roleName}</span>
            <Button
                className="text-neutral-400 hover:text-black"
                variant="link"
                size="sm"
                onClick={() => removeType(_id)}
                aria-label="Remove Role Type"
            >
                <X/>
            </Button>
        </div>
    );
}