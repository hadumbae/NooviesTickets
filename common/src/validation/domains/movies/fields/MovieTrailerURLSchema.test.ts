import {expect} from "vitest";
import {MovieTrailerURLSchema} from "./MovieTrailerURLSchema";
import {createSchemaTests, SchemaTestTask} from "../../../../utility/testing/createSchemaTests";

const validTasks: SchemaTestTask<typeof MovieTrailerURLSchema>[] = [
    {
        success: true,
        description: "valid, optional, or nullable trailer URLs",
        values: [
            "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            undefined,
            null,
        ],
    },
];

const invalidTasks: SchemaTestTask<typeof MovieTrailerURLSchema>[] = [
    {
        success: false,
        description: "invalid trailer URL",
        values: ["not-a-url", "12345"],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Must be a valid URL.");
            }
        }
    },
];

createSchemaTests({
    name: "MovieTrailerURLSchema",
    schema: MovieTrailerURLSchema,
    suites: [
        {description: "valid movie trailer URLs", tasks: validTasks},
        {description: "invalid movie trailer URLs", tasks: invalidTasks},
    ],
});
