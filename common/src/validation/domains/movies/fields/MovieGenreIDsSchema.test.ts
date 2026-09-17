import {expect} from "vitest";
import {MovieGenreIDsSchema} from "./MovieGenreIDsSchema";
import {createSchemaTests, SchemaTestTask} from "../../../../utility/testing/createSchemaTests";
import {generateObjectIdPlaceholder} from "../../../../utility/testing/generateObjectIdPlaceholder";

const validTasks: SchemaTestTask<typeof MovieGenreIDsSchema>[] = [
    {
        success: true,
        description: "valid arrays of genre IDs",
        values: [
            [],
            [generateObjectIdPlaceholder()],
            [generateObjectIdPlaceholder(), generateObjectIdPlaceholder()],
        ],
    },
];

const invalidTasks: SchemaTestTask<typeof MovieGenreIDsSchema>[] = [
    {
        success: false,
        description: "not an array of genre IDs",
        values: ["not-an-array", {}, 123],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Must be an array of genre IDs.");
            }
        }
    },
    {
        success: false,
        description: "array containing invalid genre IDs",
        values: [["not-an-id"], [123]],
    },
];

createSchemaTests({
    name: "MovieGenreIDsSchema",
    schema: MovieGenreIDsSchema,
    suites: [
        {description: "valid movie genre IDs", tasks: validTasks},
        {description: "invalid movie genre IDs", tasks: invalidTasks},
    ],
});
