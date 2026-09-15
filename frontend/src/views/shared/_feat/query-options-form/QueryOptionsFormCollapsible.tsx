/**
 * @fileoverview A collapsible container for query option forms that displays active filter counts.
 */

import {ReactElement, ReactNode} from "react";
import {Button, Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/views/shared/_comp/ui";
import {ChevronsUpDown, X} from "lucide-react";
import {UIOpenStateProps} from "@/shared/_types";
import {cn} from "@/shared/_feat/handle-ui/cn.ts";
import {useQueryOptionsFormContext} from "@/shared/_feat/query-options-form-context/useQueryOptionsFormContext.ts";

/** Props for the QueryOptionsFormCollapsible component. */
type CollapsibleProps = UIOpenStateProps & {
    children: ReactNode;
    className?: string;
    disableClear?: boolean;
    triggerText?: string;
};

/**
 * A collapsible wrapper that provides a toggle trigger and a clear button for query filters.
 * Requires QueryOptionsFormContext to manage active option counts and reset functionality.
 */
export function QueryOptionsFormCollapsible(
    {children, isOpen, setIsOpen, className, triggerText, disableClear = false}: CollapsibleProps
): ReactElement {
    const {activeOptions, resetValues} = useQueryOptionsFormContext();
    const triggerTextDisplay = !triggerText
        ? activeOptions > 0 ? `Toggle Filters • ${activeOptions}` : "Toggle Filters"
        : triggerText;

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
            <CollapsibleTrigger asChild>
                <Button variant="ghost" className="secondary-text">
                    <ChevronsUpDown/>
                    <span>{triggerTextDisplay}</span>
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className={cn("border p-3 rounded-md space-y-2", className)}>
                {children}

                {
                    !disableClear && activeOptions > 0 && (
                        <div className="flex justify-end">
                            <Button variant="secondary" onClick={resetValues} className="max-md:w-full">
                                <X/> Clear
                            </Button>
                        </div>
                    )
                }
            </CollapsibleContent>
        </Collapsible>
    );
}