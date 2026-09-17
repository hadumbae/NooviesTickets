import {expect} from "vitest";
import {BooleanValueSchema} from "./BooleanValueSchema";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";

const validTasks: SchemaTestTask<typeof BooleanValueSchema>[] = [
    {success: true, description: "valid values", values: [true, false]},
];

const invalidTasks: SchemaTestTask<typeof BooleanValueSchema>[] = [
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
        values: [null, "true", 1, 0, [], {}],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Must Be A Boolean");
            }
        }
    },
];

createSchemaTests({
    schema: BooleanValueSchema,
    name: "BooleanValueSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
