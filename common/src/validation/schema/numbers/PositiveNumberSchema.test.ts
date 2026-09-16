import {expect} from "vitest";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";
import {PositiveNumberSchema} from "./PositiveNumberSchema";

const validTasks: SchemaTestTask<typeof PositiveNumberSchema>[] = [
    {success: true, description: "valid values", values: [1, 123, 1.45, 0.5]},
];

const invalidTasks: SchemaTestTask<typeof PositiveNumberSchema>[] = [
    {
        success: false,
        description: "zero and negative values",
        values: [0, -1, -123, -1.45, -0.5],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Must Be Positive");
            }
        }
    },
];

createSchemaTests({
    schema: PositiveNumberSchema,
    name: "PositiveNumberSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
