/**
 * @fileoverview Form and hook for managing customer index query options.
 */

import {createQueryOptionsForm} from "@/shared/_feat";
import {CustomerIndexQueryOptionsFormValues} from "@/domains/customers/_types";
import {CustomerQueryOptionsSchema} from "@/domains/customers/_schema/query-options";

const {QueryOptionsForm} = createQueryOptionsForm<
    CustomerIndexQueryOptionsFormValues,
    typeof CustomerQueryOptionsSchema.shape
>({
    name: "customer-index-query-options",
    schema: CustomerQueryOptionsSchema,
});

export {
    /** Form component for filtering and sorting the customer index list. */
    QueryOptionsForm as CustomerIndexQueryOptionsForm,
}