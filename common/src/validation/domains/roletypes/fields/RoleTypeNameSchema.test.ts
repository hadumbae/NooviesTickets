import {expect} from "vitest";
import {RoleTypeNameSchema} from "./RoleTypeNameSchema";
import {createSchemaTests, SchemaTestTask} from "../../../../utility/testing/createSchemaTests";
import {generateAlphanumericString} from "../../../../utility/testing/generateAlphanumericString";

const validTasks: SchemaTestTask<typeof RoleTypeNameSchema>[] = [
    {
        success: true,
        description: "valid role type names",
        values: [
            generateAlphanumericString(1),
            generateAlphanumericString(75),
            generateAlphanumericString(150),
        ],
    },
];

const invalidTasks: SchemaTestTask<typeof RoleTypeNameSchema>[] = [
    {
        success: false,
        description: "empty role type name",
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
        description: "role type names too long",
        values: [
            generateAlphanumericString(151),
            generateAlphanumericString(200),
            generateAlphanumericString(300),
        ],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Max. 150 Characters");
            }
        }
    },
];

createSchemaTests({
    name: "RoleTypeNameSchema",
    schema: RoleTypeNameSchema,
    suites: [
        {description: "valid role type names", tasks: validTasks},
        {description: "invalid role type names", tasks: invalidTasks},
    ],
});
