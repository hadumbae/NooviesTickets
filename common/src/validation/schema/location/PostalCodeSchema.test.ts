import {expect} from "vitest";
import {PostalCodeSchema} from "./PostalCodeSchema";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";

const validTasks: SchemaTestTask<typeof PostalCodeSchema>[] = [
    {success: true, description: "valid values", values: ["12345", "a".repeat(25)]},
];

const invalidTasks: SchemaTestTask<typeof PostalCodeSchema>[] = [
    {
        success: false,
        description: "strings longer than 25 characters",
        values: ["a".repeat(26)],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Must be 25 characters or less.");
            }
        }
    },
];

createSchemaTests({
    schema: PostalCodeSchema,
    name: "PostalCodeSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
