import {expect} from "vitest";
import {UTCDayOnlyDateTimeSchema} from "./UTCDayOnlyDateTimeSchema";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";

const validTasks: SchemaTestTask<typeof UTCDayOnlyDateTimeSchema>[] = [
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
        description: "truncates the time down to the start of the day in UTC",
        values: ["2026-06-15T14:30:45.123Z"],
        callback: ({success, data}) => {
            if (success) {
                expect(data.toISODate()).toBe("2026-06-15");
                expect(data.hour).toBe(0);
                expect(data.minute).toBe(0);
                expect(data.second).toBe(0);
                expect(data.millisecond).toBe(0);
            }
        }
    },
];

createSchemaTests({
    schema: UTCDayOnlyDateTimeSchema,
    name: "UTCDayOnlyDateTimeSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
    ],
});
