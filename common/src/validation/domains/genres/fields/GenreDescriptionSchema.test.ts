import {expect} from "vitest";
import {GenreDescriptionSchema} from "./GenreDescriptionSchema";
import {createSchemaTests, SchemaTestTask} from "../../../../utility/testing/createSchemaTests";
import {generateAlphanumericString} from "../../../../utility/testing/generateAlphanumericString";

const validTasks: SchemaTestTask<typeof GenreDescriptionSchema>[] = [
    {
        success: true,
        description: "valid genre description",
        values: [
            generateAlphanumericString(10),
            generateAlphanumericString(500),
            generateAlphanumericString(1000),
        ],
    },
];

const invalidTasks: SchemaTestTask<typeof GenreDescriptionSchema>[] = [
    {
        success: false,
        description: "empty genre description",
        values: [""],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Must Not Be Empty");
            }
        }
    },
    {
        success: false,
        description: "genre names too long",
        values: [
            generateAlphanumericString(1001),
            generateAlphanumericString(1500),
            generateAlphanumericString(2000),
        ],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Max. 1000 Chars");
            }
        }
    },
];

createSchemaTests({
    name: "GenreDescriptionSchema",
    schema: GenreDescriptionSchema,
    suites: [
        {description: "valid genres", tasks: validTasks},
        {description: "invalid genres", tasks: invalidTasks},
    ],
});
