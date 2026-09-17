import {expect} from "vitest";
import {SeatLabelSchema} from "./SeatLabelSchema";
import {createSchemaTests, SchemaTestTask} from "../../../../utility/testing/createSchemaTests";
import {generateAlphanumericString} from "../../../../utility/testing/generateAlphanumericString";

const validTasks: SchemaTestTask<typeof SeatLabelSchema>[] = [
    {
        success: true,
        description: "valid seat labels",
        values: [
            generateAlphanumericString(1),
            generateAlphanumericString(10),
            generateAlphanumericString(25),
        ],
    },
];

const invalidTasks: SchemaTestTask<typeof SeatLabelSchema>[] = [
    {
        success: false,
        description: "empty seat label",
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
        description: "seat labels too long",
        values: [
            generateAlphanumericString(26),
            generateAlphanumericString(50),
            generateAlphanumericString(100),
        ],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Max. 25 Chars");
            }
        }
    },
];

createSchemaTests({
    name: "SeatLabelSchema",
    schema: SeatLabelSchema,
    suites: [
        {description: "valid seat labels", tasks: validTasks},
        {description: "invalid seat labels", tasks: invalidTasks},
    ],
});
