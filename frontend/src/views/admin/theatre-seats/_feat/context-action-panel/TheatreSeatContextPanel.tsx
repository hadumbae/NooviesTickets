/**
 * @fileoverview Slide-over panel component that orchestrates seat detail visualization, editing via TheatreSeatSubmitForm,
 * and deletion workflows using shared context.
 */

import {ReactElement, useState} from "react";
import {ScrollArea, Sheet, SheetContent} from "@/views/shared/_comp/ui";

import {TheatreSeatDetails, simplifyTheatreSeatDetails, useTheatreSeatPanelSetterContext, useTheatreSeatPanelStateContext} from "@/domains/theatre-seats";
import {TheatreSeatSubmitForm} from "@/views/admin/theatre-seats/_feat/submit-data";
import {TheatreSeatDeleteWarning} from "@/views/admin/theatre-seats/_feat/delete-seats";
import {TheatreSeatContextPanelFormView} from "@/views/admin/theatre-seats/_feat/context-action-panel/TheatreSeatContextPanelFormView.tsx";
import {TheatreSeatContextPanelHeader} from "@/views/admin/theatre-seats/_feat/context-action-panel/TheatreSeatContextPanelHeader.tsx";
import {
    TheatreSeatContextPanelOptionButtonsSection
} from "@/views/admin/theatre-seats/_feat/context-action-panel/TheatreSeatContextPanelOptionButtonsSection.tsx";
import {
    TheatreSeatContextPanelDetailsSection
} from "@/views/admin/theatre-seats/_feat/context-action-panel/TheatreSeatContextPanelDetailsSection.tsx";

/**
 * Displays and manages the lifecycle of seat information within a slide-over panel.
 */
export function TheatreSeatContextPanel(): ReactElement | null {
    const {isPanelOpen, seat} = useTheatreSeatPanelStateContext();
    const {setIsPanelOpen, setSeat} = useTheatreSeatPanelSetterContext();

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState<boolean>(false);

    const closePanel = () => setIsPanelOpen(false);
    const handleUpdateSuccess = (updatedSeat: TheatreSeatDetails) => {
        setIsEditing(false);
        setSeat(updatedSeat);
    };

    if (!seat) return null;

    return (
        <Sheet open={isPanelOpen} onOpenChange={setIsPanelOpen}>
            <SheetContent className="flex flex-col">
                <TheatreSeatContextPanelHeader/>

                <ScrollArea className="flex-1 pt-5">
                    <div className="space-y-5">
                        {
                            !isEditing && (
                                <TheatreSeatContextPanelDetailsSection
                                    seat={seat}
                                    closePanel={closePanel}
                                />
                            )
                        }

                        {isEditing && (
                            <TheatreSeatSubmitForm
                                editEntity={simplifyTheatreSeatDetails(seat)}
                                onSubmitSuccess={handleUpdateSuccess}
                                successMessage="Updated."
                            >
                                <TheatreSeatContextPanelFormView/>
                            </TheatreSeatSubmitForm>
                        )}

                        {showDeleteWarning && (
                            <TheatreSeatDeleteWarning
                                _id={seat._id}
                                className="border p-4 rounded-xl bg-destructive/5"
                                onSubmitSuccess={closePanel}
                                successMessage="Removed."
                            />
                        )}

                        <TheatreSeatContextPanelOptionButtonsSection
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                            showDeleteWarning={showDeleteWarning}
                            setShowDeleteWarning={setShowDeleteWarning}
                        />
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
