import {expect} from "vitest";
import {LongitudeSchema} from "./LongitudeSchema";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";

const validTasks: SchemaTestTask<typeof LongitudeSchema>[] = [
    {success: true, description: "valid values", values: [-180, 0, 180, 45.5]},
];

const invalidTasks: SchemaTestTask<typeof LongitudeSchema>[] = [
    {
        success: false,
        description: "values below -180",
        values: [-180.1, -200],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Longitude must be greater than or equal -180.");
            }
        }
    },
    {
        success: false,
        description: "values above 180",
        values: [180.1, 200],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Longitude must be less than or equal 180.");
            }
        }
    },
];

createSchemaTests({
    schema: LongitudeSchema,
    name: "LongitudeSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
