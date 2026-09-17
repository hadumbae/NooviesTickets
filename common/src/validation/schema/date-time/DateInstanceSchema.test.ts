import {expect} from "vitest";
import {DateInstanceSchema} from "./DateInstanceSchema";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";

const validTasks: SchemaTestTask<typeof DateInstanceSchema>[] = [
    {
        success: true,
        description: "any Date instance, including an invalid one",
        values: [new Date(), new Date(0), new Date("garbage")],
    },
];

const invalidTasks: SchemaTestTask<typeof DateInstanceSchema>[] = [
    {
        success: false,
        description: "values that are not Date instances",
        values: [undefined, null, "2026-01-01", 123, true, []],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Must be an instance of Date.");
            }
        }
    },
];

createSchemaTests({
    schema: DateInstanceSchema,
    name: "DateInstanceSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
