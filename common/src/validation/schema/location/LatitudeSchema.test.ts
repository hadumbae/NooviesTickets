import {expect} from "vitest";
import {LatitudeSchema} from "./LatitudeSchema";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";

const validTasks: SchemaTestTask<typeof LatitudeSchema>[] = [
    {success: true, description: "valid values", values: [-90, 0, 90, 45.5]},
];

const invalidTasks: SchemaTestTask<typeof LatitudeSchema>[] = [
    {
        success: false,
        description: "values below -90",
        values: [-90.1, -100],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Latitude must be greater than or equal -90.");
            }
        }
    },
    {
        success: false,
        description: "values above 90",
        values: [90.1, 100],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Latitude must be less than or equal 90.");
            }
        }
    },
];

createSchemaTests({
    schema: LatitudeSchema,
    name: "LatitudeSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
