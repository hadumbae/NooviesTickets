import {PasswordStringSchema} from "./PasswordStringSchema";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";
import {expect} from "vitest";

const validTasks: SchemaTestTask<typeof PasswordStringSchema>[] = [
    {success: true, description: "valid values", values: ["a".repeat(16), "a".repeat(200), "a".repeat(255)]},
];

const invalidTasks: SchemaTestTask<typeof PasswordStringSchema>[] = [
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
        description: "strings shorter than 16 characters",
        values: ["", "a", "a".repeat(15)],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Min. 16 Chars");
            }
        }
    },
    {
        success: false,
        description: "strings longer than 255 characters",
        values: ["a".repeat(256)],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Max. 255 Chars");
            }
        }
    },
];

createSchemaTests({
    schema: PasswordStringSchema,
    name: "PasswordStringSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
