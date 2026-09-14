/**
 * @fileoverview Generic modal dialog wrapper component integrated with form context for rendering dialog-based forms.
 */

import {ReactElement, ReactNode} from "react";
import {UIOpenStateProps} from "@/shared/_types";
import {useBaseFormContext} from "@/shared/_feat/generic-form-context";
import {
    Button,
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/views/shared/_comp/ui";

/** Props for the GenericFormDialog component. */
type DialogProps = UIOpenStateProps & {
    children: ReactNode;
    trigger: ReactNode;
    title: string;
    description: string;
    submitText?: string;
};

/**
 * Renders a generic form dialog overlay connected to the base form context for handling submit actions.
 */
export function GenericFormDialog(
    {children, trigger, title, description, isOpen, setIsOpen, submitText = "Submit"}: DialogProps
): ReactElement {
    const {formID} = useBaseFormContext();

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="primary-text">{title}</DialogTitle>
                    <DialogDescription className="secondary-text">{description}</DialogDescription>
                </DialogHeader>

                {children}

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>

                    <Button form={formID} variant="primary" type="submit">
                        {submitText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}