/**
 * @fileoverview Type definitions for the genre image management repository.
 */

import {ObjectIdString} from "@noovies-tickets/common";

/** Configuration for updating a genre image. */
export type UpdateGenreImageConfig = {
    _id: ObjectIdString;
    formData: FormData;
}

/** Configuration for removing a genre image. */
export type RemoveGenreImageConfig = {
    _id: ObjectIdString;
}