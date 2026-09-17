import {expect} from "vitest";
import {SlugStringSchema} from "./SlugString";
import {createSchemaTests, SchemaTestTask} from "../../../../utility/testing/createSchemaTests";

const validTasks: SchemaTestTask<typeof SlugStringSchema>[] = [
    {success: true, description: "valid values", values: ["my-movie-title", "a".repeat(75)]},
];

const invalidTasks: SchemaTestTask<typeof SlugStringSchema>[] = [
    {
        success: false,
        description: "strings longer than 75 characters",
        values: ["a".repeat(76)],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Max. 75 Chars");
            }
        }
    },
];

createSchemaTests({
    schema: SlugStringSchema,
    name: "SlugStringSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
