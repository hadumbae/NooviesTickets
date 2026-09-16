import {NonEmptyStringSchema} from "./NonEmptyStringSchema";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";
import {expect} from "vitest";

const validTasks: SchemaTestTask<typeof NonEmptyStringSchema>[] = [
    {success: true, description: "valid values", values: ["a", "abc", "  padded  "]},
];

const invalidTasks: SchemaTestTask<typeof NonEmptyStringSchema>[] = [
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
    {
        success: false,
        description: "strings that are empty once trimmed",
        values: ["", "   "],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Min. 1 Char");
            }
        }
    },
];

createSchemaTests({
    schema: NonEmptyStringSchema,
    name: "NonEmptyStringSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
