import {expect} from "vitest";
import {MovieTaglineSchema} from "./MovieTaglineSchema";
import {createSchemaTests, SchemaTestTask} from "../../../../utility/testing/createSchemaTests";
import {generateAlphanumericString} from "../../../../utility/testing/generateAlphanumericString";

const validTasks: SchemaTestTask<typeof MovieTaglineSchema>[] = [
    {
        success: true,
        description: "valid movie taglines",
        values: [
            generateAlphanumericString(1),
            generateAlphanumericString(50),
            generateAlphanumericString(100),
        ],
    },
];

const invalidTasks: SchemaTestTask<typeof MovieTaglineSchema>[] = [
    {
        success: false,
        description: "empty movie tagline",
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
        description: "movie taglines too long",
        values: [
            generateAlphanumericString(101),
            generateAlphanumericString(150),
            generateAlphanumericString(200),
        ],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Must be 100 characters or less.");
            }
        }
    },
];

createSchemaTests({
    name: "MovieTaglineSchema",
    schema: MovieTaglineSchema,
    suites: [
        {description: "valid movie taglines", tasks: validTasks},
        {description: "invalid movie taglines", tasks: invalidTasks},
    ],
});
