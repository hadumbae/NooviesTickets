import {expect} from "vitest";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";
import {NonNegativeIntegerSchema} from "./NonNegativeIntegerSchema";

const validTasks: SchemaTestTask<typeof NonNegativeIntegerSchema>[] = [
    {success: true, description: "valid values", values: [0, 1, 123]},
];

const invalidTasks: SchemaTestTask<typeof NonNegativeIntegerSchema>[] = [
    {
        success: false,
        description: "negative integers",
        values: [-1, -123],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Must Not Be Negative");
            }
        }
    },
    {
        success: false,
        description: "positive non-integer values",
        values: [1.45, 0.5],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Must Be An Integer");
            }
        }
    },
    {
        success: false,
        description: "negative non-integer values fail both constraints at once",
        values: [-1.45, -0.5],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues.map((issue) => issue.message).sort()).toEqual(
                    ["Must Be An Integer", "Must Not Be Negative"].sort()
                );
            }
        }
    },
];

createSchemaTests({
    schema: NonNegativeIntegerSchema,
    name: "NonNegativeIntegerSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
