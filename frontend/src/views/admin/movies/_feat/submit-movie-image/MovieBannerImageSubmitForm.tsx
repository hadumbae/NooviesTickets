/**
 * @fileoverview Form component and context hook for submitting a movie banner image.
 */

import {createForm} from "@/shared/_feat";
import {Movie} from "@noovies-tickets/common";
import {MovieImageFormData, MovieImageFormSchema, MovieImageFormValues,} from "@/domains/movies/_feat/manage-images";
import {SubmitMovieImageConfig, useSubmitMovieBannerImage} from "@/domains/movies/_feat/manage-images/upload-image";

const {SubmitForm} = createForm<
    MovieImageFormValues,
    MovieImageFormData,
    unknown,
    Movie,
    SubmitMovieImageConfig
>({
    schema: MovieImageFormSchema,
    formName: "movie-banner-image-submit-form",
    mutation: useSubmitMovieBannerImage,
    defaultValues: {
        image: "",
    }
});

export {
    /** Form provider for managing movie banner image submissions. */
        SubmitForm as MovieBannerImageSubmitForm,
};

