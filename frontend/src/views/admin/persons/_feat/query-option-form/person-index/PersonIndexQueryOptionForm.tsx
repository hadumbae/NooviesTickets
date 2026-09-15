import {createQueryOptionForm} from "@/shared/_feat";
import {
    PersonIndexQueryOptionSchema
} from "@/domains/persons/_feat/validate-query-options/person-index/PersonIndexQueryOptionSchema.ts";

const {QueryOptionsForm} = createQueryOptionForm({
    schema: PersonIndexQueryOptionSchema,
    name: "person-index-query-option-form",
});

export {
    QueryOptionsForm as PersonIndexQueryOptionForm,
};