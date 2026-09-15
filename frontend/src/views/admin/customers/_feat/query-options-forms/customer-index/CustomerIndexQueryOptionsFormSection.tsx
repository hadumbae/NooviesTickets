/**
 * @fileoverview Form section for managing customer index query options.
 */

import {createQueryOptionsFormSection} from "@/shared/_feat";
import {useCustomerIndexQueryOptionsContext} from "@/domains/customers/_ctx/CustomerIndexQueryOptionsContext.ts";
import {CustomerIndexQueryOptionsForm} from "@/views/admin/customers/_feat/query-options-forms/customer-index/CustomerIndexQueryOptionsForm.tsx";
import {CustomerIndexQueryOptionsFormView} from "@/views/admin/customers/_feat/query-options-forms/customer-index/CustomerIndexQueryOptionsFormView.tsx";

/**
 * A section component for customer index query options.
 * Requires wrapping in a CustomerIndexQueryOptionsProvider.
 */
export const CustomerIndexQueryOptionsFormSection = createQueryOptionsFormSection({
    formView: CustomerIndexQueryOptionsFormView,
    queryOptionsForm: CustomerIndexQueryOptionsForm,
    useQueryOptionsContext: useCustomerIndexQueryOptionsContext,
});