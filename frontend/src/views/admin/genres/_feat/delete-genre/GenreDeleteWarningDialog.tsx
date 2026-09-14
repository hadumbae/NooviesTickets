/**
 * @fileoverview A warning dialog component for confirming the deletion of a genre.
 */

import {ReactElement, ReactNode} from 'react';
import {ObjectIdString} from "@noovies-tickets/common";
import {
    EntityDeleteWarningDialog
} from "@/views/shared/_feat/dialog/EntityDeleteWarningDialog.tsx";
import {MutationResponseConfig} from "@/shared/_feat/submit-data";
import {UIOpenStateProps} from "@/shared/_types";
import {useDeleteGenre} from "@/domains/genres/_feat/crud-hooks/mutate/useDeleteGenre.ts";

/** Props for the {@link GenreDeleteWarningDialog} component. */
type DialogProps = UIOpenStateProps & {
    children?: ReactNode;
    _id: ObjectIdString;
    name: string;
    onSubmitConfig?: MutationResponseConfig<void, { _id: ObjectIdString }>;
};

/**
 * Renders a confirmation dialog that triggers the genre deletion mutation.
 */
export function GenreDeleteWarningDialog(
    {children, _id, name, isOpen, setIsOpen, onSubmitConfig}: DialogProps
): ReactElement {
    const {mutate} = useDeleteGenre(onSubmitConfig);

    return (
        <EntityDeleteWarningDialog
            title={`Proceed to delete "${name}"?`}
            deleteResource={() => mutate({_id})}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            {children}
        </EntityDeleteWarningDialog>
    );
}