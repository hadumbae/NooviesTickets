/**
 * @fileoverview Inline action menu for managing individual movie reviews.
 */

import {ObjectIdString} from "@noovies-tickets/common";
import {Ellipsis} from "lucide-react";
import {IconButton} from "@/views/shared/_comp";
import {ReactElement, useState} from "react";
import {toast} from "react-toastify";
import {Button, Popover, PopoverContent, PopoverTrigger} from "@/views/shared/_comp/ui";
import {useDeleteCurrentUserMovieReviewMutation} from "@/domains/movie-reviews";

/** Props for the MovieReviewIndexCardActions component. */
type ActionProps = {
    reviewID: ObjectIdString;
    movieID?: ObjectIdString;
    toggleEdit: (openState: boolean) => void;
};

/**
 * Renders a popover menu containing management actions for a specific movie review. */
export function MovieReviewIndexCardActions(
    {reviewID, movieID, toggleEdit}: ActionProps
): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {mutate: deleteReview} = useDeleteCurrentUserMovieReviewMutation({
        successMessage: "Review Removed",
        onSubmitSuccess: () => setIsLoading(false),
        onSubmitError: () => setIsLoading(false),
    });

    const onClickDelete = () => {
        if (!isLoading) {
            setIsLoading(true);
            deleteReview({reviewID, movieID});
        } else {
            toast.warning("Action Currently Unavailable");
        }
    }

    return (
        <Popover defaultOpen={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <IconButton>
                    <Ellipsis/>
                </IconButton>
            </PopoverTrigger>
            <PopoverContent className="w-fit p-0 flex flex-col">
                <Button
                    variant="ghost"
                    className="rounded py-5"
                    onClick={() => toggleEdit(true)}
                >
                    Edit
                </Button>

                <Button
                    variant="ghost"
                    className="rounded py-5"
                    onClick={onClickDelete}
                >
                    Delete
                </Button>
            </PopoverContent>
        </Popover>
    );
}