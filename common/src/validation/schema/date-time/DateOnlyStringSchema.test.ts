import {expect} from "vitest";
import {DateOnlyStringSchema} from "./DateOnlyStringSchema";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";

const validTasks: SchemaTestTask<typeof DateOnlyStringSchema>[] = [
    {success: true, description: "valid values", values: ["2026-01-01", "2024-02-29"]},
];

const invalidTasks: SchemaTestTask<typeof DateOnlyStringSchema>[] = [
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
        description: "strings matching the shape but naming a date that doesn't exist",
        values: ["2026-13-45", "2026-02-30"],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Must be a valid date.");
            }
        }
    },
    {
        success: false,
        description: "strings that fail both the shape and the calendar check at once",
        values: ["01-01-2026", "2026/01/01"],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues.map((issue) => issue.message).sort()).toEqual(
                    ["Must be a valid date.", "Must be yyyy-MM-dd."].sort()
                );
            }
        }
    },
];

createSchemaTests({
    schema: DateOnlyStringSchema,
    name: "DateOnlyStringSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
