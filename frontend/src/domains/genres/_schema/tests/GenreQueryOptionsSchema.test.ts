import {createSchemaTests, SchemaTestTask} from "@noovies-tickets/common";
import {
    type GenreQueryOptions,
    GenreQueryOptionsSchema
} from "@/domains/genres/_schema/filters/GenreQueryOptionsSchema.ts";

type SchemaType = typeof GenreQueryOptionsSchema;

const validValues: GenreQueryOptions[] = [
    {},
    {name: "hello", sortByName: 1},
]

const validInputs: SchemaTestTask<SchemaType>[] = [
    {success: true, description: "full values", values: validValues}
];

createSchemaTests({
    schema: GenreQueryOptionsSchema,
    name: "GenreQueryOptionsSchema",
    suites: [
        {description: "valid values", tasks: validInputs},
    ],
});