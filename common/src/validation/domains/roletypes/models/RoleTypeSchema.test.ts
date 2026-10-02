import {expect} from "vitest";
import {RoleType, RoleTypeSchema} from "./RoleTypeSchema";
import {createSchemaTests, SchemaTestTask} from "../../../../utility/testing/createSchemaTests";
import {generateObjectIdPlaceholder} from "../../../../utility/testing/generateObjectIdPlaceholder";

const validCastRoleType: RoleType = {
    _id: generateObjectIdPlaceholder(),
    roleName: "Lead Actor",
    department: "CAST",
    category: "Actor",
    description: "Plays the lead role.",
};

const validCrewRoleType = {
    _id: generateObjectIdPlaceholder(),
    roleName: "Director",
    department: "CREW",
    category: "Director",
    description: null,
};

const invalidRoleType = {};

const invalidMismatchedCategory = {
    _id: generateObjectIdPlaceholder(),
    roleName: "Lead Actor",
    department: "CAST",
    category: "Director",
};

const invalidMissingDepartment = {
    _id: generateObjectIdPlaceholder(),
    roleName: "Lead Actor",
    category: "Actor",
    description: "Plays the lead role.",
};

const invalidUnknownDepartment = {
    ...invalidMissingDepartment,
    department: "EXTRA",
};

const validTasks: SchemaTestTask<typeof RoleTypeSchema>[] = [
    {success: true, description: "valid cast role type", values: [validCastRoleType]},
    {success: true, description: "valid crew role type", values: [validCrewRoleType]},
];

const invalidTasks: SchemaTestTask<typeof RoleTypeSchema>[] = [
    {success: false, description: "invalid, empty role type", values: [invalidRoleType]},
    {success: false, description: "category not matching department", values: [invalidMismatchedCategory]},
    {
        success: false,
        description: "missing department reports `Required`, not an invalid discriminator message",
        values: [invalidMissingDepartment],
        callback: (results) => {
            if (!results.success) {
                expect(results.error.issues[0].message).toBe("Required");
            }
        },
    },
    {
        success: false,
        description: "unknown department reports the invalid discriminator message",
        values: [invalidUnknownDepartment],
        callback: (results) => {
            if (!results.success) {
                expect(results.error.issues[0].message).toBe("Must be `CAST` or `CREW`.");
            }
        },
    },
];

createSchemaTests({
    name: "RoleTypeSchema",
    schema: RoleTypeSchema,
    suites: [
        {description: "valid role types", tasks: validTasks},
        {description: "invalid role types", tasks: invalidTasks},
    ],
});
