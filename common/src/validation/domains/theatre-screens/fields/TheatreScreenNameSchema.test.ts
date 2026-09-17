import {expect} from "vitest";
import {TheatreScreenNameSchema} from "./TheatreScreenNameSchema";
import {createSchemaTests, SchemaTestTask} from "../../../../utility/testing/createSchemaTests";
import {generateAlphanumericString} from "../../../../utility/testing/generateAlphanumericString";

const validTasks: SchemaTestTask<typeof TheatreScreenNameSchema>[] = [
    {
        success: true,
        description: "valid theatre screen names",
        values: [
            generateAlphanumericString(1),
            generateAlphanumericString(100),
            generateAlphanumericString(255),
        ],
    },
];

const invalidTasks: SchemaTestTask<typeof TheatreScreenNameSchema>[] = [
    {
        success: false,
        description: "empty theatre screen name",
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
        description: "theatre screen names too long",
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
    name: "TheatreScreenNameSchema",
    schema: TheatreScreenNameSchema,
    suites: [
        {description: "valid theatre screen names", tasks: validTasks},
        {description: "invalid theatre screen names", tasks: invalidTasks},
    ],
});
