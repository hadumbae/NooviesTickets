import {expect} from "vitest";
import {TimezoneOffsetSchema} from "./TimezoneOffsetSchema";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";

const validTasks: SchemaTestTask<typeof TimezoneOffsetSchema>[] = [
    {
        success: true,
        description: "valid values",
        values: ["+00:00", "-00:00", "-12:00", "+14:00", "+05:30", "-08:00", "+05:45"],
    },
];

const invalidTasks: SchemaTestTask<typeof TimezoneOffsetSchema>[] = [
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
        description: "values with hours or minutes out of range",
        values: ["+99:99", "+50:99", "+23:59", "+05:60"],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Invalid timezone offset format. Expected ±HH:MM");
            }
        }
    },
    {
        success: false,
        description: "values outside the real-world UTC offset range of -12:00 to +14:00",
        values: ["-13:00", "-14:00", "+15:00"],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Invalid timezone offset format. Expected ±HH:MM");
            }
        }
    },
    {
        success: false,
        description: "malformed strings",
        values: ["05:30", "+5:30", "+05:5", "not an offset"],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Invalid timezone offset format. Expected ±HH:MM");
            }
        }
    },
];

createSchemaTests({
    schema: TimezoneOffsetSchema,
    name: "TimezoneOffsetSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
