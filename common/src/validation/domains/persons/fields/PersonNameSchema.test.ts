import {expect} from "vitest";
import {PersonNameSchema} from "./PersonNameSchema";
import {createSchemaTests, SchemaTestTask} from "../../../../utility/testing/createSchemaTests";
import {generateAlphanumericString} from "../../../../utility/testing/generateAlphanumericString";

const validTasks: SchemaTestTask<typeof PersonNameSchema>[] = [
    {
        success: true,
        description: "valid person names",
        values: [
            generateAlphanumericString(1),
            generateAlphanumericString(100),
            generateAlphanumericString(255),
        ],
    },
];

const invalidTasks: SchemaTestTask<typeof PersonNameSchema>[] = [
    {
        success: false,
        description: "empty person name",
        values: [""],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Min. 1 Char");
            }
        }
    },
    {
        success: false,
        description: "person names too long",
        values: [
            generateAlphanumericString(256),
            generateAlphanumericString(300),
            generateAlphanumericString(500),
        ],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Max. 255 Chars");
            }
        }
    },
];

createSchemaTests({
    name: "PersonNameSchema",
    schema: PersonNameSchema,
    suites: [
        {description: "valid person names", tasks: validTasks},
        {description: "invalid person names", tasks: invalidTasks},
    ],
});
