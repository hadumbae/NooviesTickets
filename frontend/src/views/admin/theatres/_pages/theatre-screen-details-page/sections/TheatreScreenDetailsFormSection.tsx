/**
 * @fileoverview Renders a form section component for creating and listing newly created seats for a theatre screen.
 */

import {ReactElement, useState} from "react";
import {PageSectionHeader} from "@/views/shared/_comp";
import {Card, CardContent, Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/views/shared/_comp/ui";
import {TheatreSeatFormSubmitList, TheatreSeatSubmitForm, TheatreSeatSubmitFormActions, TheatreSeatSubmitFormView} from "@/views/admin/theatre-seats";
import {TheatreSeatDetails, TheatreSeatFormData, TheatreSeatFormValues} from "@/domains/theatre-seats";
import {HideFields} from "@/shared/_types";
import {ObjectIdString} from "@noovies-tickets/common";
import {ChevronDown, ChevronUp} from "lucide-react";

/** Props for the TheatreScreenDetailsFormSection component. */
type SectionProps = {
    screenID: ObjectIdString;
    theatreID: ObjectIdString;
};

/**
 * Renders the form and list for adding new seats to a specific theatre screen.
 */
export function TheatreScreenDetailsFormSection(
    {screenID, theatreID}: SectionProps
): ReactElement {
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [returnedSeating, setReturnedSeating] = useState<TheatreSeatDetails[]>([]);

    const presetValues: Partial<TheatreSeatFormData> = {screen: screenID, theatre: theatreID};
    const hideFields: HideFields<TheatreSeatFormValues> = {screen: true, theatre: true};
    const onSeatCreation = (seat: TheatreSeatDetails) => setReturnedSeating((prev: TheatreSeatDetails[]) => [...prev, seat]);

    return (
        <section className="space-y-4">
            <PageSectionHeader as="h2" text="Create Seats"/>

            <Collapsible open={isCreating} onOpenChange={setIsCreating}>
                <CollapsibleTrigger
                    className="primary-text rounded-container-border p-3 flex items-center space-x-2"
                >
                    <span>{isCreating ? "Close" : "Open"} Form</span>
                    {isCreating ? <ChevronUp/> : <ChevronDown/>}
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4">
                    <Card>
                        <TheatreSeatSubmitForm presetValues={presetValues} onSubmitSuccess={onSeatCreation}>
                            <CardContent className="p-4 space-y-4">
                                <TheatreSeatSubmitFormView hideFields={hideFields}/>
                                <TheatreSeatSubmitFormActions/>
                            </CardContent>
                        </TheatreSeatSubmitForm>
                    </Card>

                    {returnedSeating.length > 0 && (
                        <section className="space-y-2">
                            <PageSectionHeader as="h2" text="Seats"/>

                            <TheatreSeatFormSubmitList
                                returnedSeating={returnedSeating}
                                setReturnedSeating={setReturnedSeating}
                            />
                        </section>
                    )}
                </CollapsibleContent>
            </Collapsible>


        </section>
    );
}