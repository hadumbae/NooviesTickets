import {expect} from "vitest";
import {TheatreNameSchema} from "./TheatreNameSchema";
import {createSchemaTests, SchemaTestTask} from "../../../../utility/testing/createSchemaTests";
import {generateAlphanumericString} from "../../../../utility/testing/generateAlphanumericString";

const validTasks: SchemaTestTask<typeof TheatreNameSchema>[] = [
    {
        success: true,
        description: "valid theatre names",
        values: [
            generateAlphanumericString(1),
            generateAlphanumericString(100),
            generateAlphanumericString(255),
        ],
    },
];

const invalidTasks: SchemaTestTask<typeof TheatreNameSchema>[] = [
    {
        success: false,
        description: "empty theatre name",
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
        description: "theatre names too long",
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
    name: "TheatreNameSchema",
    schema: TheatreNameSchema,
    suites: [
        {description: "valid theatre names", tasks: validTasks},
        {description: "invalid theatre names", tasks: invalidTasks},
    ],
});
