import {expect} from "vitest";
import {ISO8601StringSchema} from "./ISO8601StringSchema";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";

const validTasks: SchemaTestTask<typeof ISO8601StringSchema>[] = [
    {
        success: true,
        description: "valid values",
        values: ["2026-01-01T00:00:00Z", "2026-06-15T14:30:45.123Z", "2024-02-29T23:59:59Z"],
    },
];

const invalidTasks: SchemaTestTask<typeof ISO8601StringSchema>[] = [
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
        values: [null, 123, true, [], {}],
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
        description: "strings that don't match the yyyy-MM-ddThh:mm:ssZ shape",
        values: ["2026-01-01", "2026-01-01T00:00:00", "2026-01-01T00:00:00+02:00"],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Must Be A Valid UTC ISO 8601 String Ending In 'Z'.");
            }
        }
    },
    {
        success: false,
        description: "strings matching the shape but naming a date or time that doesn't exist",
        values: ["2026-13-45T99:99:99Z", "2026-02-30T10:00:00Z", "2026-06-31T10:00:00Z"],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Invalid Date Time Value");
            }
        }
    },
    {
        success: false,
        description: "strings that fail both the shape and the calendar check at once",
        values: ["not a date", ""],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues.map((issue) => issue.message).sort()).toEqual(
                    ["Invalid Date Time Value", "Must Be A Valid UTC ISO 8601 String Ending In 'Z'."].sort()
                );
            }
        }
    },
];

createSchemaTests({
    schema: ISO8601StringSchema,
    name: "ISO8601StringSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
