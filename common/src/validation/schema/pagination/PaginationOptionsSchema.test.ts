import {expect} from "vitest";
import {PaginationOptionsSchema} from "./PaginationOptionsSchema";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";

const validTasks: SchemaTestTask<typeof PaginationOptionsSchema>[] = [
    {
        success: true,
        description: "valid values",
        values: [{page: 1, perPage: 1}, {page: "2", perPage: "2"}],
    },
    {
        success: true,
        description: "ignored values",
        values: [{ignored: 123, values: "456"}, {page: 1, nextPage: 1}],
    },
    {
        success: true,
        description: "empty with default",
        values: [{}],
        callback: ({data, success}) => {
            if (success) {
                expect(data).toEqual({page: 1, perPage: 10});
            }
        },
    },
    {
        success: true,
        description: "bad values caught",
        values: [{page: true, perPage: false}, {page: "abc", perPage: "-500"}],
        callback: ({data, success}) => {
            if (success) {
                expect(data).toEqual({page: 1, perPage: 10});
            }
        }
    },
];

createSchemaTests({
    schema: PaginationOptionsSchema,
    name: "PaginationOptionsSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
    ],
});