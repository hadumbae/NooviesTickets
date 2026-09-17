import {expect} from "vitest";
import {CoordinateValuesSchema} from "./CoordinateValuesSchema";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";

const validTasks: SchemaTestTask<typeof CoordinateValuesSchema>[] = [
    {success: true, description: "valid [longitude, latitude] tuples", values: [[0, 0], [180, 90], [-180, -90]]},
];

const invalidTasks: SchemaTestTask<typeof CoordinateValuesSchema>[] = [
    {
        success: false,
        description: "missing or non-array values",
        values: [undefined, null, "not an array", {}],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Invalid Coordinates");
            }
        }
    },
    {
        success: false,
        description: "arrays with too few elements",
        values: [[], [1]],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Array must contain at least 2 element(s)");
            }
        }
    },
    {
        success: false,
        description: "arrays with too many elements",
        values: [[1, 2, 3]],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Array must contain at most 2 element(s)");
            }
        }
    },
    {
        success: false,
        description: "the first position is validated as longitude",
        values: [[200, 2]],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].path).toEqual([0]);
                expect(issues[0].message).toBe("Longitude must be less than or equal 180.");
            }
        }
    },
    {
        success: false,
        description: "the second position is validated as latitude",
        values: [[1, 200]],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].path).toEqual([1]);
                expect(issues[0].message).toBe("Latitude must be less than or equal 90.");
            }
        }
    },
];

createSchemaTests({
    schema: CoordinateValuesSchema,
    name: "CoordinateValuesSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
