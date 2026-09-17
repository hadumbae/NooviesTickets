import {expect} from "vitest";
import {CityStringSchema} from "./CityStringSchema";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";

const validTasks: SchemaTestTask<typeof CityStringSchema>[] = [
    {success: true, description: "valid values", values: ["Springfield", "a".repeat(500)]},
];

const invalidTasks: SchemaTestTask<typeof CityStringSchema>[] = [
    {
        success: false,
        description: "strings longer than 500 characters",
        values: ["a".repeat(501)],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Max. 500 Chars");
            }
        }
    },
];

createSchemaTests({
    schema: CityStringSchema,
    name: "CityStringSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
