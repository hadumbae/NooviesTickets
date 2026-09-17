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

const validTasks: SchemaTestTask<typeof RoleTypeSchema>[] = [
    {success: true, description: "valid cast role type", values: [validCastRoleType]},
    {success: true, description: "valid crew role type", values: [validCrewRoleType]},
];

const invalidTasks: SchemaTestTask<typeof RoleTypeSchema>[] = [
    {success: false, description: "invalid, empty role type", values: [invalidRoleType]},
    {success: false, description: "category not matching department", values: [invalidMismatchedCategory]},
];

createSchemaTests({
    name: "RoleTypeSchema",
    schema: RoleTypeSchema,
    suites: [
        {description: "valid role types", tasks: validTasks},
        {description: "invalid role types", tasks: invalidTasks},
    ],
});
