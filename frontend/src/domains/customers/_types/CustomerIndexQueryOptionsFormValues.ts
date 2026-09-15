/**
 * @fileoverview Types for the customer index query options form.
 */

import {AnyValues} from "@/shared/_types";
import {CustomerQueryOptions} from "@/domains/customers/_schema/query-options";

/** Form values for the customer index query options. */
export type CustomerIndexQueryOptionsFormValues = AnyValues<CustomerQueryOptions>;