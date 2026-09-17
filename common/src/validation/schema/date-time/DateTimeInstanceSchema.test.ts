import {expect} from "vitest";
import {DateTime} from "luxon";
import {DateTimeInstanceSchema} from "./DateTimeInstanceSchema";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";

const validTasks: SchemaTestTask<typeof DateTimeInstanceSchema>[] = [
    {
        success: true,
        description: "valid Luxon DateTime instances",
        values: [DateTime.now(), DateTime.fromISO("2026-01-01T00:00:00Z")],
    },
];

const invalidTasks: SchemaTestTask<typeof DateTimeInstanceSchema>[] = [
    {
        success: false,
        description: "values that are not Luxon DateTime instances",
        values: [undefined, null, new Date(), "2026-01-01", 123],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Must be an instance of Luxon's DateTime.");
            }
        }
    },
    {
        success: false,
        description: "a Luxon DateTime instance that is itself invalid",
        values: [DateTime.invalid("test reason")],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Must be an instance of Luxon's DateTime.");
            }
        }
    },
];

createSchemaTests({
    schema: DateTimeInstanceSchema,
    name: "DateTimeInstanceSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
