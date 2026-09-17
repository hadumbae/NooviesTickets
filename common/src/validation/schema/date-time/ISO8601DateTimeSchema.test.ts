import {expect} from "vitest";
import {ISO8601DateTimeSchema} from "./ISO8601DateTimeSchema";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";

const validTasks: SchemaTestTask<typeof ISO8601DateTimeSchema>[] = [
    {
        success: true,
        description: "transforms into a valid Luxon DateTime instance in UTC",
        values: ["2026-01-01T00:00:00Z", "2024-02-29T23:59:59Z"],
        callback: ({success, data}) => {
            if (success) {
                expect(data.isValid).toBe(true);
                expect(data.zoneName).toBe("UTC");
            }
        }
    },
    {
        success: true,
        description: "preserves the exact time of day instead of truncating it",
        values: ["2026-06-15T14:30:45.123Z"],
        callback: ({success, data}) => {
            if (success) {
                expect(data.hour).toBe(14);
                expect(data.minute).toBe(30);
                expect(data.second).toBe(45);
                expect(data.millisecond).toBe(123);
            }
        }
    },
];

createSchemaTests({
    schema: ISO8601DateTimeSchema,
    name: "ISO8601DateTimeSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
    ],
});
