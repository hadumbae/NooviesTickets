import {expect} from "vitest";
import {createSchemaTests, SchemaTestTask} from "../../utility/testing/createSchemaTests";
import {generatePaginationSchema} from "./generatePaginationSchema";
import {StringValueSchema} from "../schema/strings/StringValueSchema";

const paginationSchema = generatePaginationSchema(StringValueSchema);

const validTasks: SchemaTestTask<typeof paginationSchema>[] = [
    {
        success: true,
        description: "valid pagination shapes",
        values: [
            {totalItems: 0, items: []},
            {totalItems: 1, items: ["a"]},
            {totalItems: 2, items: ["a", "b"]},
            {totalItems: 3, items: ["a", "b", "c"]},
        ],
    },
];

const invalidTasks: SchemaTestTask<typeof paginationSchema>[] = [
    {
        success: false,
        description: "missing value",
        values: [undefined],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Required");
            }
        }
    },
    {
        success: false,
        description: "non-object values",
        values: [123, true, "pagination"],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Must Be A Pagination Object ({totalItems, items})");
            }
        }
    },
    {
        success: false,
        description: "non-array items",
        values: [{totalItems: 1, items: "abc"}],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Must Be An Array");
            }
        }
    },
    {
        success: false,
        description: "non-number totalItems",
        values: [{totalItems: "1", items: []}],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Must Be A Number");
            }
        }
    },
    {
        success: false,
        description: "items with inconsistent element types",
        values: [
            {totalItems: 3, items: ["a", 1, "b"]},
            {totalItems: 2, items: [null, "a"]},
        ],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Must Be A String");
            }
        }
    },
];

createSchemaTests({
    schema: paginationSchema,
    name: "generatePaginationSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
