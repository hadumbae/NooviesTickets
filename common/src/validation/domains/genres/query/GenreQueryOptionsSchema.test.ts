import {GenreQueryOptions, GenreQueryOptionsSchema} from "./GenreQueryOptionsSchema";
import {createSchemaTests, SchemaTestTask} from "../../../../utility/testing/createSchemaTests";

type SchemaType = typeof GenreQueryOptionsSchema;

const validValues: GenreQueryOptions[] = [
    {},
    {name: "hello", sortByName: 1},
    {isFeatured: true},
    {name: "hello", isFeatured: false, sortByName: -1},
];

const validInputs: SchemaTestTask<SchemaType>[] = [
    {success: true, description: "full values", values: validValues},
];

createSchemaTests({
    schema: GenreQueryOptionsSchema,
    name: "GenreQueryOptionsSchema",
    suites: [
        {description: "valid values", tasks: validInputs},
    ],
});
