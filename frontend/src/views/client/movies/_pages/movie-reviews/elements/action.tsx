/**
 * @fileoverview Displays review count and provides an action for creating or editing a user review.
 */

import {ReactElement, useState} from "react";
import {MessageCirclePlus} from "lucide-react";
import {Button} from "@/views/shared/_comp/ui";
import {ObjectIdString} from "@noovies-tickets/common";
import {cn} from "@/shared/_feat";

import {MovieReviewFormPopup} from "@/views/client/movie-reviews";
import {MovieReviewDetails, simplifyMovieReview} from "@/domains/movie-reviews";
import {LabelContent} from "@/views/shared/_comp";

/** Props for the MovieInfoReviewAction component. */
type ActionProps = {
    movieID: ObjectIdString;
    totalReviews: number;
    userReview: MovieReviewDetails | null;
    className?: string;
};

/**
 * Displays the total review count and a button that opens the review submission popup.
 */
export function MovieInfoReviewAction(
    {movieID, totalReviews, userReview, className}: ActionProps
): ReactElement {
    const isEditing = !!userReview;
    const reviewToEdit = isEditing ? simplifyMovieReview(userReview) : undefined;
    const successMessage = isEditing ? "Updated." : undefined;
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className={cn(
            "rounded-container-border flex justify-between items-center p-3",
            className
        )}>
            <LabelContent label="Total Reviews" orientation="horizontal" classNames={{label: "secondary-text"}}>
                <span className="primary-text">{totalReviews}</span>
            </LabelContent>

            <MovieReviewFormPopup
                movieID={movieID}
                reviewToEdit={reviewToEdit}
                onSubmitConfig={{successMessage}}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            >
                <Button variant="primary" size="sm" type="button">
                    <MessageCirclePlus/>{" "}
                    {isEditing ? "Edit Your Review" : "Write A Review"}
                </Button>
            </MovieReviewFormPopup>
        </div>
    );
}