import {createQueryOptionsForm} from "@/shared/_feat";
import {
    PersonIndexQueryOptionsSchema
} from "@/domains/persons/_feat/validate-query-options/person-index/PersonIndexQueryOptionsSchema.ts";

const {QueryOptionsForm} = createQueryOptionsForm({
    schema: PersonIndexQueryOptionsSchema,
    name: "person-index-query-options-form",
});

export {
    QueryOptionsForm as PersonIndexQueryOptionsForm,
};