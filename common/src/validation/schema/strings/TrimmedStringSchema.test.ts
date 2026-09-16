import {TrimmedStringSchema} from "./TrimmedStringSchema";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";
import {expect} from "vitest";

const validTasks: SchemaTestTask<typeof TrimmedStringSchema>[] = [
    {success: true, description: "valid values", values: ["", "abc", "123"]},
    {
        success: true,
        description: "strings with leading or trailing whitespace",
        values: ["  abc  ", "\tabc\n"],
        callback: ({success, data}) => {
            if (success) {
                expect(data).toBe("abc");
            }
        }
    },
];

const invalidTasks: SchemaTestTask<typeof TrimmedStringSchema>[] = [
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
    schema: TrimmedStringSchema,
    name: "TrimmedStringSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
