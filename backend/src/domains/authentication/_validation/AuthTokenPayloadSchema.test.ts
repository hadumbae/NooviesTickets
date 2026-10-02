import {createSchemaTests, type SchemaTestTask} from "@noovies-tickets/common";
import {AuthTokenPayloadSchema} from "@/domains/authentication/_validation/AuthTokenPayloadSchema";
import { expect } from "vitest";
import {mockUsers} from "@/domains/authentication/_validation/MockUsers";

const validPayloads = [
    {user: mockUsers.adminUser, isAdmin: true, status: "ACTIVE"},
    {user: mockUsers.clientUser, isAdmin: false, status: "ACTIVE"},
    {user: mockUsers.inactiveUser, isAdmin: false, status: "INACTIVE"},
];

const validTasks: SchemaTestTask<typeof AuthTokenPayloadSchema>[] = [
    {success: true, description: "valid values", values: validPayloads}
];

const missingFieldsPayloads = [
    {isAdmin: true, status: "ACTIVE"},
    {user: mockUsers.adminUser, status: "ACTIVE"},
    {user: mockUsers.adminUser, isAdmin: true},
];

const invalidTasks: SchemaTestTask<typeof AuthTokenPayloadSchema>[] = [
    {
        success: false,
        description: "empty values",
        values: [{}],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(3);

                expect(issues[0].path).toEqual(["user"]);
                expect(issues[0].message).toBe("Required");
                expect(issues[1].path).toEqual(["isAdmin"]);
                expect(issues[1].message).toBe("Required");
                expect(issues[2].path).toEqual(["status"]);
                expect(issues[2].message).toBe("Required");
            }
        }
    },
    {
        success: false,
        description: "missing fields",
        values: missingFieldsPayloads,
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Required");
            }
        }
    }
];

createSchemaTests({
    schema: AuthTokenPayloadSchema,
    name: "AuthTokenPayloadSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
