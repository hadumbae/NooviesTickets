import {expect} from "vitest";
import {TheatreSeatCapacitySchema} from "./TheatreSeatCapacitySchema";
import {createSchemaTests, SchemaTestTask} from "../../../../utility/testing/createSchemaTests";

const validTasks: SchemaTestTask<typeof TheatreSeatCapacitySchema>[] = [
    {
        success: true,
        description: "valid theatre seat capacities",
        values: [0, 500, 2500, "750"],
    },
];

const invalidTasks: SchemaTestTask<typeof TheatreSeatCapacitySchema>[] = [
    {
        success: false,
        description: "negative theatre seat capacity",
        values: [-1, -100],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Must Not Be Negative");
            }
        }
    },
    {
        success: false,
        description: "theatre seat capacity exceeding maximum",
        values: [2501, 5000],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Max. 2500");
            }
        }
    },
    {
        success: false,
        description: "non-numeric theatre seat capacity",
        values: ["", null, "abc"],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Required");
            }
        }
    },
];

createSchemaTests({
    name: "TheatreSeatCapacitySchema",
    schema: TheatreSeatCapacitySchema,
    suites: [
        {description: "valid theatre seat capacities", tasks: validTasks},
        {description: "invalid theatre seat capacities", tasks: invalidTasks},
    ],
});
