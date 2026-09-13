/**
 * @fileoverview Zod schema and TypeScript type for theatre detail search parameters, handling tab state and pagination.
 */

import {z} from "zod";
import {preprocessToNumber, NonNegativeNumberSchema} from "@noovies-tickets/common";


/**
 * Validates query string parameters for the theatre details view, including active tab selection and list pagination.
 */
export const TheatreDetailsSearchParamSchema = z.object({
    screenPage: preprocessToNumber(NonNegativeNumberSchema).optional(),
    screenPerPage: preprocessToNumber(NonNegativeNumberSchema).optional(),
    showingPage: preprocessToNumber(NonNegativeNumberSchema).optional(),
    showingPerPage: preprocessToNumber(NonNegativeNumberSchema).optional(),
    activeTab: z.enum(["screens", "showings"], {message: "Invalid value. Must be 'screens' or 'showings'."}).optional(),
});

/**
 * Validated search parameters for the theatre details page.
 */
export type TheatreDetailsSearchParams = z.infer<typeof TheatreDetailsSearchParamSchema>;