import {expect} from "vitest";
import {PersonBiographySchema} from "./PersonBiographySchema";
import {createSchemaTests, SchemaTestTask} from "../../../../utility/testing/createSchemaTests";
import {generateAlphanumericString} from "../../../../utility/testing/generateAlphanumericString";

const validTasks: SchemaTestTask<typeof PersonBiographySchema>[] = [
    {
        success: true,
        description: "valid person biography",
        values: [
            generateAlphanumericString(10),
            generateAlphanumericString(500),
            generateAlphanumericString(1000),
        ],
    },
];

const invalidTasks: SchemaTestTask<typeof PersonBiographySchema>[] = [
    {
        success: false,
        description: "empty person biography",
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
        description: "person biography too long",
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
    name: "PersonBiographySchema",
    schema: PersonBiographySchema,
    suites: [
        {description: "valid person biographies", tasks: validTasks},
        {description: "invalid person biographies", tasks: invalidTasks},
    ],
});
