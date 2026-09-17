import {expect} from "vitest";
import {SeatRowSchema} from "./SeatRowSchema";
import {createSchemaTests, SchemaTestTask} from "../../../../utility/testing/createSchemaTests";
import {generateAlphanumericString} from "../../../../utility/testing/generateAlphanumericString";

const validTasks: SchemaTestTask<typeof SeatRowSchema>[] = [
    {
        success: true,
        description: "valid seat rows",
        values: [
            generateAlphanumericString(1),
            generateAlphanumericString(5),
            generateAlphanumericString(10),
        ],
    },
];

const invalidTasks: SchemaTestTask<typeof SeatRowSchema>[] = [
    {
        success: false,
        description: "empty seat row",
        values: [""],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Min. 1 Char");
            }
        }
    },
    {
        success: false,
        description: "seat rows too long",
        values: [
            generateAlphanumericString(11),
            generateAlphanumericString(20),
            generateAlphanumericString(50),
        ],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Max. 10 Chars");
            }
        }
    },
];

createSchemaTests({
    name: "SeatRowSchema",
    schema: SeatRowSchema,
    suites: [
        {description: "valid seat rows", tasks: validTasks},
        {description: "invalid seat rows", tasks: invalidTasks},
    ],
});
