import {createSchemaTests, type SchemaTestTask} from "@noovies-tickets/common";
import {AuthUserSchema} from "@/domains/authentication/_validation/AuthUserSchema";
import {expect} from "vitest";
import {mockUsers} from "@/domains/authentication/_validation/MockUsers";

const validTasks: SchemaTestTask<typeof AuthUserSchema>[] = [
    {success: true, description: "admin user", values: [mockUsers.adminUser]},
    {success: true, description: "client user", values: [mockUsers.clientUser]},
    {success: true, description: "inactive user", values: [mockUsers.inactiveUser]},
];

const invalidTasks: SchemaTestTask<typeof AuthUserSchema>[] = [
    {
        success: false,
        description: "empty user",
        values: [mockUsers.emptyUser],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(6);

                expect(issues[0].path).toEqual(["_id"]);
                expect(issues[1].path).toEqual(["name"]);
                expect(issues[2].path).toEqual(["email"]);
                expect(issues[3].path).toEqual(["uniqueCode"]);
                expect(issues[4].path).toEqual(["status"]);
                expect(issues[5].path).toEqual(["roles"]);
            }
        }
    },
    {
        success: false,
        description: "user with less than one role",
        values: [mockUsers.invalidUser],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(2);

                expect(issues[0].path).toEqual(["roles"]);
                expect(issues[0].message).toBe("Must have at least one role.");

                expect(issues[1].path).toEqual(["roles"]);
                expect(issues[1].message).toBe("Must include the 'USER' role.");
            }
        }
    },
    {
        success: false,
        description: "user missing `USER` role",
        values: [mockUsers.missingRoleUser],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].path).toEqual(["roles"]);
                expect(issues[0].message).toBe("Must include the 'USER' role.");
            }
        }
    },
];

createSchemaTests({
    name: "AuthUserSchema",
    schema: AuthUserSchema,
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
})