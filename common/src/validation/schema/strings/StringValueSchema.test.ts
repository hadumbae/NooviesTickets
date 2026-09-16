import {StringValueSchema} from "./StringValueSchema";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";
import {expect} from "vitest";

const validTasks: SchemaTestTask<typeof StringValueSchema>[] = [
    {success: true, description: "valid values", values: ["", "abc", "123", "abc123"]},
];

const invalidTasks: SchemaTestTask<typeof StringValueSchema>[] = [
    {
        success: false,
        description: "missing values",
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
        description: "values with invalid types",
        values: [null, 123, true],
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
    schema: StringValueSchema,
    name: "StringValueSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});