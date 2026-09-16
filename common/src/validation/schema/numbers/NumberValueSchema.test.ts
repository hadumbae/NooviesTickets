import {expect} from "vitest";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";
import {NumberValueSchema} from "./NumberValueSchema";

const validTasks: SchemaTestTask<typeof NumberValueSchema>[] = [
    {success: true, description: "valid values", values: [0, -1, -123, 1, 123, 1.45, -5.34]},
];

const invalidTasks: SchemaTestTask<typeof NumberValueSchema>[] = [
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
        values: [null, "123", true, [], {}, NaN],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Must Be A Number");
            }
        }
    },
    {
        success: false,
        description: "values that are infinite",
        values: [Infinity, -Infinity],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Must Be Finite");
            }
        }
    },
];

createSchemaTests({
    schema: NumberValueSchema,
    name: "NumberValueSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});