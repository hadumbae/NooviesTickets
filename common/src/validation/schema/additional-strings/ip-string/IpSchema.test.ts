import {expect} from "vitest";
import {IpSchema} from "./IpSchema";
import {createSchemaTests, SchemaTestTask} from "../../../../utility/testing/createSchemaTests";

const validTasks: SchemaTestTask<typeof IpSchema>[] = [
    {success: true, description: "valid IPv4 and IPv6 addresses", values: ["192.168.1.1", "2001:db8::1"]},
];

const invalidTasks: SchemaTestTask<typeof IpSchema>[] = [
    {
        success: false,
        description: "strings that aren't a valid IP address",
        values: ["not.an.ip", "999.999.999.999", "abcd", ""],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Must be a valid IP address.");
            }
        }
    },
];

createSchemaTests({
    schema: IpSchema,
    name: "IpSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
