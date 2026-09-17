import {expect} from "vitest";
import {StreetStringSchema} from "./StreetStringSchema";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";

const validTasks: SchemaTestTask<typeof StreetStringSchema>[] = [
    {success: true, description: "valid values", values: ["123 Main St", "a".repeat(2000)]},
];

const invalidTasks: SchemaTestTask<typeof StreetStringSchema>[] = [
    {
        success: false,
        description: "strings longer than 2000 characters",
        values: ["a".repeat(2001)],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Must be 2000 characters or less.");
            }
        }
    },
];

createSchemaTests({
    schema: StreetStringSchema,
    name: "StreetStringSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
