import {expect} from "vitest";
import {IDStringSchema} from "./IDStringSchema";
import {createSchemaTests, SchemaTestTask} from "../../../../utility/testing/createSchemaTests";
import {generateObjectIdPlaceholder} from "../../../../utility/testing/generateObjectIdPlaceholder";

const validTasks: SchemaTestTask<typeof IDStringSchema>[] = [
    {
        success: true,
        description: "any 24-character string, hex or not",
        values: [generateObjectIdPlaceholder(), generateObjectIdPlaceholder(), "z".repeat(24)],
    },
];

const invalidTasks: SchemaTestTask<typeof IDStringSchema>[] = [
    {
        success: false,
        description: "strings that aren't exactly 24 characters",
        values: [generateObjectIdPlaceholder().slice(0, 23), generateObjectIdPlaceholder() + "a", ""],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("ID String must be exactly 24 characters.");
            }
        }
    },
];

createSchemaTests({
    schema: IDStringSchema,
    name: "IDStringSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
