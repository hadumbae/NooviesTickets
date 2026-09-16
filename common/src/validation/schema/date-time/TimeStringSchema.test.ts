import {expect} from "vitest";
import {TimeStringSchema} from "./TimeStringSchema";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";

const validTasks: SchemaTestTask<typeof TimeStringSchema>[] = [
    {success: true, description: "valid values", values: ["15:00", "16:35", "15:50"]},
];

const invalidTasks: SchemaTestTask<typeof TimeStringSchema>[] = [
    {
        success: false,
        description: "invalid random strings",
        values: ["abc", "123", "hello, world !@#"],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("hh:mm Format Required");
            }
        }
    },
    {
        success: false,
        description: "invalid time strings",
        values: ["25:20", "52:67", "44:87"],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("hh:mm Format Required");
            }
        }
    },
];

createSchemaTests({
    schema: TimeStringSchema,
    name: "TimeStringSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});