import {expect} from "vitest";
import {IpV4Schema} from "./IpV4Schema";
import {createSchemaTests, SchemaTestTask} from "../../../../utility/testing/createSchemaTests";

const validTasks: SchemaTestTask<typeof IpV4Schema>[] = [
    {success: true, description: "valid IPv4 addresses", values: ["192.168.1.1", "0.0.0.0", "255.255.255.255"]},
];

const invalidTasks: SchemaTestTask<typeof IpV4Schema>[] = [
    {
        success: false,
        description: "strings that aren't a valid IPv4 address, including IPv6 addresses",
        values: ["2001:db8::1", "not.an.ip", "999.999.999.999", "abcd", ""],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Must be a valid IP V4 address");
            }
        }
    },
];

createSchemaTests({
    schema: IpV4Schema,
    name: "IpV4Schema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
