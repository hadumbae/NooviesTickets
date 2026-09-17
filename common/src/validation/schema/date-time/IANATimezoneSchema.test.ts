import {expect} from "vitest";
import {IANATimezoneSchema} from "./IANATimezoneSchema";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";

const validTasks: SchemaTestTask<typeof IANATimezoneSchema>[] = [
    {
        success: true,
        description: "valid IANA time zone names",
        values: ["America/New_York", "Europe/London", "Asia/Tokyo", "Australia/Sydney"],
    },
];

const invalidTasks: SchemaTestTask<typeof IANATimezoneSchema>[] = [
    {
        success: false,
        description: "missing, wrongly typed, or unrecognized time zone values",
        values: [undefined, null, 123, "Not/AZone"],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Invalid Time Zone.");
            }
        }
    },
];

createSchemaTests({
    schema: IANATimezoneSchema,
    name: "IANATimezoneSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
