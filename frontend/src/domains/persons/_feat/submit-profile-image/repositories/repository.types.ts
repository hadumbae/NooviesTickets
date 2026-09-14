/**
 * @fileoverview Type definitions for profile image repository operations.
 */

import {ObjectIdString} from "@noovies-tickets/common";
import {RequestOptions} from "@/shared/_types/request/RequestOptions.ts";

/**
 * Parameters for uploading a profile image.
 */
export type UploadProfileImageConfig = {
    _id: ObjectIdString;
    data: FormData;
    config?: Omit<RequestOptions, "limit">;
};

