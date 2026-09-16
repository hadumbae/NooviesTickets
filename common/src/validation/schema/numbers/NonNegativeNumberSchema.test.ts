import {expect} from "vitest";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";
import {NonNegativeNumberSchema} from "./NonNegativeNumberSchema";

const validTasks: SchemaTestTask<typeof NonNegativeNumberSchema>[] = [
    {success: true, description: "valid values", values: [0, 1, 123, 1.45, 0.5]},
];

const invalidTasks: SchemaTestTask<typeof NonNegativeNumberSchema>[] = [
    {
        success: false,
        description: "negative values",
        values: [-1, -123, -1.45, -0.5],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Must Not Be Negative");
            }
        }
    },
];

createSchemaTests({
    schema: NonNegativeNumberSchema,
    name: "NonNegativeNumberSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
