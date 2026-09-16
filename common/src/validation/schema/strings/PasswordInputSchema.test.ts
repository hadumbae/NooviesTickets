import {PasswordInputSchema} from "./PasswordInputSchema";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";
import {expect} from "vitest";

const validTasks: SchemaTestTask<typeof PasswordInputSchema>[] = [
    {success: true, description: "valid values", values: ["a", "correct-horse-battery-staple", "a".repeat(1024)]},
];

const invalidTasks: SchemaTestTask<typeof PasswordInputSchema>[] = [
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
    {
        success: false,
        description: "strings longer than 1024 characters",
        values: ["a".repeat(1025)],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Max. 1024 Chars");
            }
        }
    },
];

createSchemaTests({
    schema: PasswordInputSchema,
    name: "PasswordInputSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
