import {expect} from "vitest";
import {RoleTypeDescriptionSchema} from "./RoleTypeDescriptionSchema";
import {createSchemaTests, SchemaTestTask} from "../../../../utility/testing/createSchemaTests";
import {generateAlphanumericString} from "../../../../utility/testing/generateAlphanumericString";

const validTasks: SchemaTestTask<typeof RoleTypeDescriptionSchema>[] = [
    {
        success: true,
        description: "valid role type descriptions",
        values: [
            generateAlphanumericString(10),
            generateAlphanumericString(500),
            generateAlphanumericString(1000),
        ],
    },
    {
        success: true,
        description: "optional/nullable role type descriptions",
        values: [undefined, null],
    },
];

const invalidTasks: SchemaTestTask<typeof RoleTypeDescriptionSchema>[] = [
    {
        success: false,
        description: "empty role type description",
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
        description: "role type descriptions too long",
        values: [
            generateAlphanumericString(1001),
            generateAlphanumericString(1500),
            generateAlphanumericString(2000),
        ],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Max. 1000 Characters");
            }
        }
    },
];

createSchemaTests({
    name: "RoleTypeDescriptionSchema",
    schema: RoleTypeDescriptionSchema,
    suites: [
        {description: "valid role type descriptions", tasks: validTasks},
        {description: "invalid role type descriptions", tasks: invalidTasks},
    ],
});
