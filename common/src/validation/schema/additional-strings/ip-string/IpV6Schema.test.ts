import {expect} from "vitest";
import {IpV6Schema} from "./IpV6Schema";
import {createSchemaTests, SchemaTestTask} from "../../../../utility/testing/createSchemaTests";

const validTasks: SchemaTestTask<typeof IpV6Schema>[] = [
    {success: true, description: "valid IPv6 addresses", values: ["2001:db8::1", "::1", "::"]},
];

const invalidTasks: SchemaTestTask<typeof IpV6Schema>[] = [
    {
        success: false,
        description: "strings that aren't a valid IPv6 address, including IPv4 addresses",
        values: ["192.168.1.1", "not.an.ip", "999.999.999.999", "abcd", ""],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Must be a valid IP V6 address");
            }
        }
    },
];

createSchemaTests({
    schema: IpV6Schema,
    name: "IpV6Schema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
