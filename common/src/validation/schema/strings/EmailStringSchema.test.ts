import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";
import {EmailStringSchema} from "./EmailStringSchema";
import {expect} from "vitest";

const validTasks: SchemaTestTask<typeof EmailStringSchema>[] = [
    {
        success: true,
        description: "valid email addresses",
        values: ["abc@gmail.com", "hello@outlook.com", "good-day@proton.me"],
    },
];

const invalidTasks: SchemaTestTask<typeof EmailStringSchema>[] = [
    {
        success: false,
        description: "invalid email addresses",
        values: ["abc.com", "hello@outlook", "good day@yahoo.net"],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Must be an email address.");
            }
        }
    },
];

createSchemaTests({
   schema: EmailStringSchema,
   name: "EmailStringSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});