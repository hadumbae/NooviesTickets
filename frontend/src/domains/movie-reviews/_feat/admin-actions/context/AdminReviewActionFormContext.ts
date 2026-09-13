/**
 * @fileoverview React Context for sharing movie review metadata across administrative moderation forms.
 */

import {ObjectIdString} from "@noovies-tickets/common";
import {createContext} from "react";

/** Shape of the context values provided to moderation form children. */
export type AdminReviewActionFormContextValues = {
    formID: string;
    reviewID: ObjectIdString;
}

/** Context provider for administrative review actions. */
export const AdminReviewActionFormContext = createContext<AdminReviewActionFormContextValues | undefined>(undefined);