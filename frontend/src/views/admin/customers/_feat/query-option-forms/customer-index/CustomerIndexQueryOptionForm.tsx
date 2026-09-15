/**
 * @fileoverview Form and hook for managing customer index query options.
 */

import {createQueryOptionForm} from "@/shared/_feat";
import {CustomerIndexQueryOptionFormValues} from "@/domains/customers/_types";
import {CustomerQueryOptionsSchema} from "@/domains/customers/_schema/query-options";

const {QueryOptionsForm} = createQueryOptionForm<
    CustomerIndexQueryOptionFormValues,
    typeof CustomerQueryOptionsSchema.shape
>({
    name: "customer-index-query-options",
    schema: CustomerQueryOptionsSchema,
});

export {
    /** Form component for filtering and sorting the customer index list. */
    QueryOptionsForm as CustomerIndexQueryOptionForm,
}