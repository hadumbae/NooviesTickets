import {ReactElement, useEffect} from "react";
import {MovieDetails} from "@/domains/movies";
import {PageFlexWrapper} from "@/views/shared/_comp";
import {CreateMovieShowingPageHeader} from "@/views/admin/movies/_pages/create-showing-page/elements/header.tsx";
import {useNavigate} from "react-router-dom";
import {ShowingDetails, ShowingSubmitStorageKey} from "@/domains/showings";
import {Card, CardContent} from "@/views/shared/_comp/ui";
import {ShowingSubmitForm, ShowingSubmitFormView} from "@/views/admin/showings";

type ContentProps = {
    movie: MovieDetails;
    setTitle: (title: string) => void;
};

export function MovieCreateShowingPageContent(
    {movie, setTitle}: ContentProps
): ReactElement {
    const navigate = useNavigate();

    useEffect(() => {
        setTitle(`Create Showing For ${movie.title}}`);
    },[movie, setTitle]);

    const onSubmit = ({slug: showingSlug}: ShowingDetails) => {
        navigate(`/admin/theatres/get/${showingSlug}/showings/list`);
    };

    return (
        <PageFlexWrapper>
            <CreateMovieShowingPageHeader movie={movie}/>

            <Card>
                <CardContent className="p-3">
                    <ShowingSubmitForm
                        localStorageKey={ShowingSubmitStorageKey}
                        presetValues={{movie: movie._id}}
                        onSubmitSuccess={onSubmit}
                        resetOnSuccess={true}
                    >
                        <ShowingSubmitFormView
                            disableFields={{movie: true}}
                            hideFields={{movie: true}}
                        />
                    </ShowingSubmitForm>
                </CardContent>
            </Card>
        </PageFlexWrapper>
    );
}