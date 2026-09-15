import {createQueryOptionForm} from "@/shared/_feat";
import {
    BrowsePersonsQueryOptionsSchema
} from "@/domains/persons/_feat/validate-query-options/person-browse/BrowsePersonsQueryOptionsSchema.ts";

const {QueryOptionForm} = createQueryOptionForm({
    name: "BrowsePersonsQueryOptions",
    schema: BrowsePersonsQueryOptionsSchema,
});

export {
    QueryOptionForm as BrowsePersonsQueryOptionForm,
}