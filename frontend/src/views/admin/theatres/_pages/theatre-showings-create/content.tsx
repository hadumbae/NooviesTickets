/**
 * @fileoverview Main content component for the theatre showing creation administrative page.
 */

import {PageFlexWrapper} from "@/views/shared/_comp/page";
import {useLoggedNavigate} from "@/shared/_feat/navigation/useLoggedNavigate.ts";
import {Card, CardContent} from "@/views/shared/_comp/ui/card.tsx";
import {ShowingSubmitForm} from "@/views/admin/showings/_feat/submit-form/ShowingSubmitForm.tsx";
import {ShowingSubmitStorageKey} from "@/domains/showings/_feat/submit-data/ShowingSubmitStorageKey.ts";
import {ReactElement, useEffect} from "react";

import {Theatre} from "@noovies-tickets/common";
import {ShowingSubmitFormView} from "@/views/admin/showings/_feat/submit-form";
import {PageHeader} from "@/views/shared/_comp";
import {
    TheatreShowingCreateBreadcrumbs
} from "@/views/admin/theatres/_pages/theatre-showings-create/elements/breadcrumbs.tsx";

/** Props for the TheatreShowingCreatePageContent component. */
type ContentProps = {
    theatre: Theatre;
    setTitle: (title: string) => void;
};

/**
 * Renders the layout for the showing creation flow, including the header and submission form.
 */
export function TheatreShowingCreatePageContent(
    {theatre, setTitle}: ContentProps
): ReactElement {
    const navigate = useLoggedNavigate();
    const {_id: theatreID, name: theatreName, slug: theatreSlug} = theatre;

    useEffect(() => {
        setTitle(`Create Showing For ${theatre.name}`);
    }, [theatre, setTitle]);

    const onSubmit = () => {
        navigate({
            to: `/admin/theatres/get/${theatreSlug}/showings/list`,
            level: "log",
            message: "Navigate To Theatre's List Of Showing.",
            component: TheatreShowingCreatePageContent.name,
        });
    };

    return (
        <PageFlexWrapper>
            <PageHeader
                title={`${theatreName} | Showings`}
                description="Create showings for theatre here."
                breadcrumbs={
                    <TheatreShowingCreateBreadcrumbs
                        theatreSlug={theatreSlug}
                        theatreName={theatreName}
                    />
                }
            />

            <Card>
                <CardContent className="p-3">
                    <ShowingSubmitForm
                        localStorageKey={ShowingSubmitStorageKey}
                        presetValues={{theatre: theatreID}}
                        onSubmitSuccess={onSubmit}
                        resetOnSuccess={true}
                    >
                        <ShowingSubmitFormView
                            disableFields={{theatre: true}}
                            hideFields={{theatre: true}}
                        />
                    </ShowingSubmitForm>
                </CardContent>
            </Card>
        </PageFlexWrapper>
    );
}