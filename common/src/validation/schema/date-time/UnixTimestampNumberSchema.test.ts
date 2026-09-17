import {expect} from "vitest";
import {UnixTimestampNumberSchema} from "./UnixTimestampNumberSchema";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";

const now = Math.floor(Date.now() / 1000);

const validTasks: SchemaTestTask<typeof UnixTimestampNumberSchema>[] = [
    {
        success: true,
        description: "valid values",
        values: [946684800, now, now + 30],
    },
];

const invalidTasks: SchemaTestTask<typeof UnixTimestampNumberSchema>[] = [
    {
        success: false,
        description: "timestamps before the epoch cutoff",
        values: [0, 946684799],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Timestamp is too old.");
            }
        }
    },
    {
        success: false,
        description: "timestamps too far in the future",
        values: [now + 10_000],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Timestamp seems to be in the future!");
            }
        }
    },
];

createSchemaTests({
    schema: UnixTimestampNumberSchema,
    name: "UnixTimestampNumberSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
