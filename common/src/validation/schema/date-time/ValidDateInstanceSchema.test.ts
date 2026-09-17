import {expect} from "vitest";
import {ValidDateInstanceSchema} from "./ValidDateInstanceSchema";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";

const validTasks: SchemaTestTask<typeof ValidDateInstanceSchema>[] = [
    {
        success: true,
        description: "valid Date instances",
        values: [new Date(), new Date(0), new Date("2026-01-01")],
    },
];

const invalidTasks: SchemaTestTask<typeof ValidDateInstanceSchema>[] = [
    {
        success: false,
        description: "values that are not Date instances",
        values: [undefined, null, "2026-01-01", 123, true],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Input not instance of Date");
            }
        }
    },
    {
        success: false,
        description: "Date instances that don't represent a real point in time",
        values: [new Date("garbage"), new Date(NaN)],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Invalid date.");
            }
        }
    },
];

createSchemaTests({
    schema: ValidDateInstanceSchema,
    name: "ValidDateInstanceSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
