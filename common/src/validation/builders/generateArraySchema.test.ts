import {expect} from "vitest";
import {createSchemaTests, SchemaTestTask} from "../../utility/testing/createSchemaTests";
import {generateArraySchema} from "./generateArraySchema";
import {NumberValueSchema} from "../schema/numbers/NumberValueSchema";

const arraySchema = generateArraySchema(NumberValueSchema);

const validTasks: SchemaTestTask<typeof arraySchema>[] = [
    {
        success: true,
        description: "valid number arrays",
        values: [[], [1, 2, 3], [-1, -5, -10], [-1, 0, 1], [-572.23, 52.12, 0]],
    },
];

const invalidTasks: SchemaTestTask<typeof arraySchema>[] = [
    {
        success: false,
        description: "missing value",
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
        description: "non-array values",
        values: [true, null, 123, "[1,2,3]"],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Must Be An Array");
            }
        }
    },
    {
        success: false,
        description: "arrays with invalid elements",
        values: [[1, 2, true], [1, null, 3], ["1", 2, 3]],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Must Be A Number");
            }
        }
    },
];

createSchemaTests({
    schema: arraySchema,
    name: "generateArraySchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
