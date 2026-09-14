/**
 * @fileoverview Form section for managing customer index query options.
 */

import {createQueryOptionFormSection} from "@/shared/_feat";
import {useCustomerIndexQueryOptionsContext} from "@/domains/customers/_ctx/CustomerIndexQueryOptionsContext.ts";
import {CustomerIndexQueryOptionForm} from "@/views/admin/customers/_feat/query-option-forms/customer-index/CustomerIndexQueryOptionForm.tsx";
import {CustomerIndexQueryOptionFormView} from "@/views/admin/customers/_feat/query-option-forms/customer-index/CustomerIndexQueryOptionFormView.tsx";

/**
 * A section component for customer index query options.
 * Requires wrapping in a CustomerIndexQueryOptionsProvider.
 */
export const CustomerIndexQueryOptionFormSection = createQueryOptionFormSection({
    formView: CustomerIndexQueryOptionFormView,
    queryOptionForm: CustomerIndexQueryOptionForm,
    useQueryOptionsContext: useCustomerIndexQueryOptionsContext,
});