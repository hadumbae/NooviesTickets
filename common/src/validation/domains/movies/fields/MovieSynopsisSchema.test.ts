import {expect} from "vitest";
import {MovieSynopsisSchema} from "./MovieSynopsisSchema";
import {createSchemaTests, SchemaTestTask} from "../../../../utility/testing/createSchemaTests";
import {generateAlphanumericString} from "../../../../utility/testing/generateAlphanumericString";

const validTasks: SchemaTestTask<typeof MovieSynopsisSchema>[] = [
    {
        success: true,
        description: "valid movie synopses",
        values: [
            generateAlphanumericString(1),
            generateAlphanumericString(1000),
            generateAlphanumericString(2000),
        ],
    },
];

const invalidTasks: SchemaTestTask<typeof MovieSynopsisSchema>[] = [
    {
        success: false,
        description: "empty movie synopsis",
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
        description: "movie synopses too long",
        values: [
            generateAlphanumericString(2001),
            generateAlphanumericString(2500),
            generateAlphanumericString(3000),
        ],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Synopsis must be 2000 characters or less.");
            }
        }
    },
];

createSchemaTests({
    name: "MovieSynopsisSchema",
    schema: MovieSynopsisSchema,
    suites: [
        {description: "valid movie synopses", tasks: validTasks},
        {description: "invalid movie synopses", tasks: invalidTasks},
    ],
});
