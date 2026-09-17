import {expect} from "vitest";
import {GenreNameSchema} from "./GenreNameSchema";
import {createSchemaTests, SchemaTestTask} from "../../../../utility/testing/createSchemaTests";
import {generateAlphanumericString} from "../../../../utility/testing/generateAlphanumericString";

const validTasks: SchemaTestTask<typeof GenreNameSchema>[] = [
    {
        success: true,
        description: "valid genre names",
        values: [
            generateAlphanumericString(10),
            generateAlphanumericString(100),
            generateAlphanumericString(255),
        ],
    },
];

const invalidTasks: SchemaTestTask<typeof GenreNameSchema>[] = [
    {
        success: false,
        description: "genre names too short",
        values: ["", "a", "ab"],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Min. 3 Chars");
            }
        }
    },
    {
        success: false,
        description: "genre names too long",
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
    name: "GenreNameSchema",
    schema: GenreNameSchema,
    suites: [
        {description: "valid genres", tasks: validTasks},
        {description: "invalid genres", tasks: invalidTasks},
    ],
});
