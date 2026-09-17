import {expect} from "vitest";
import {MovieTitleSchema} from "./MovieTitleSchema";
import {createSchemaTests, SchemaTestTask} from "../../../../utility/testing/createSchemaTests";
import {generateAlphanumericString} from "../../../../utility/testing/generateAlphanumericString";

const validTasks: SchemaTestTask<typeof MovieTitleSchema>[] = [
    {
        success: true,
        description: "valid movie titles",
        values: [
            generateAlphanumericString(1),
            generateAlphanumericString(125),
            generateAlphanumericString(250),
        ],
    },
];

const invalidTasks: SchemaTestTask<typeof MovieTitleSchema>[] = [
    {
        success: false,
        description: "empty movie title",
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
        description: "movie titles too long",
        values: [
            generateAlphanumericString(251),
            generateAlphanumericString(300),
            generateAlphanumericString(500),
        ],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Max. 250 Chars");
            }
        }
    },
];

createSchemaTests({
    name: "MovieTitleSchema",
    schema: MovieTitleSchema,
    suites: [
        {description: "valid movie titles", tasks: validTasks},
        {description: "invalid movie titles", tasks: invalidTasks},
    ],
});
