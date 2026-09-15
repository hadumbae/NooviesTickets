import {createQueryOptionsForm} from "@/shared/_feat";
import {
    BrowsePersonsQueryOptionsSchema
} from "@/domains/persons/_feat/validate-query-options/person-browse/BrowsePersonsQueryOptionsSchema.ts";

const {QueryOptionsForm} = createQueryOptionsForm({
    name: "BrowsePersonsQueryOptions",
    schema: BrowsePersonsQueryOptionsSchema,
});

export {
    QueryOptionsForm as BrowsePersonsQueryOptionsForm,
}