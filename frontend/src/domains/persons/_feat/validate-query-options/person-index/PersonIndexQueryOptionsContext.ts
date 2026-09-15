/**
 * @fileoverview React context provider and hook for managing person index query options.
 */

import {createQueryOptionsContext} from "@/shared/_feat";
import {
    PersonIndexQueryOptionsSchema
} from "@/domains/persons/_feat/validate-query-options/person-index/PersonIndexQueryOptionsSchema.ts";

const {Provider, useQueryOptionsContext} = createQueryOptionsContext({
    schema: PersonIndexQueryOptionsSchema,
    name: "person-index-query-options-context",
})

export {
    /** Context provider component for person index query options. */
        Provider as PersonIndexQueryOptionsContextProvider,
    /** Custom hook to access person index query options from context. */
        useQueryOptionsContext as usePersonIndexQueryOptionsContext,
}