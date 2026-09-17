import {expect} from "vitest";
import {DateTime} from "luxon";
import {NonFutureDateStringSchema} from "./NonFutureDateStringSchema";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";

const today = DateTime.utc().toFormat("yyyy-MM-dd");
const yesterday = DateTime.utc().minus({days: 1}).toFormat("yyyy-MM-dd");
const tomorrow = DateTime.utc().plus({days: 1}).toFormat("yyyy-MM-dd");

const validTasks: SchemaTestTask<typeof NonFutureDateStringSchema>[] = [
    {success: true, description: "today and past dates, compared in UTC", values: [today, yesterday, "2000-01-01"]},
];

const invalidTasks: SchemaTestTask<typeof NonFutureDateStringSchema>[] = [
    {
        success: false,
        description: "dates in the future, compared in UTC",
        values: [tomorrow],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Must be a current or past date.");
            }
        }
    },
];

createSchemaTests({
    schema: NonFutureDateStringSchema,
    name: "NonFutureDateStringSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
