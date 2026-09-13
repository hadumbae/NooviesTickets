/**
 * @fileoverview Zod schema for validating and parsing search parameters on the user profile page.
 */

import {z} from "zod";
import {MyProfilePageActiveTabSchema} from "@/domains/users/_feat/my-profile-page/schema/MyProfilePageActiveTabSchema.ts";
import {preprocessToNumber, PositiveNumberSchema} from "@noovies-tickets/common";

/** Schema defining the valid search parameters for the profile page including tab selection and pagination. */
export const MyProfilePageSearchParamsSchema = z.object({
    activeTab: MyProfilePageActiveTabSchema.optional().default("password"),
    resPage: preprocessToNumber(PositiveNumberSchema.optional()).optional().default(1),
    rvwPage: preprocessToNumber(PositiveNumberSchema.optional()).optional().default(1),
    favPage: preprocessToNumber(PositiveNumberSchema.optional()).optional().default(1),
});

/** Type representing the validated search parameters for the profile page. */
export type MyProfilePageSearchParams = z.infer<typeof MyProfilePageSearchParamsSchema>;
