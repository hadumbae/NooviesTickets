import {expect} from "vitest";
import {CoordinateSchema} from "./CoordinateSchema";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";

const validTasks: SchemaTestTask<typeof CoordinateSchema>[] = [
    {success: true, description: "a valid GeoJSON Point", values: [{type: "Point", coordinates: [0, 0]}]},
];

const invalidTasks: SchemaTestTask<typeof CoordinateSchema>[] = [
    {
        success: false,
        description: "missing or non-object values",
        values: [undefined, null, "not an object", 123],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Must Be A Coordinate Object");
            }
        }
    },
    {
        success: false,
        description: "a type that isn't the literal 'Point'",
        values: [{type: "NotPoint", coordinates: [1, 2]}],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].path).toEqual(["type"]);
            }
        }
    },
    {
        success: false,
        description: "missing coordinates",
        values: [{type: "Point"}],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].path).toEqual(["coordinates"]);
                expect(issues[0].message).toBe("Invalid Coordinates");
            }
        }
    },
    {
        success: false,
        description: "both fields wrong at once",
        values: [{}],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(2);
                expect(issues.map((issue) => issue.path)).toEqual(
                    expect.arrayContaining([["type"], ["coordinates"]])
                );
            }
        }
    },
    {
        success: false,
        description: "delegates coordinate values to the nested tuple and number schemas",
        values: [{type: "Point", coordinates: [200, 2]}],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].path).toEqual(["coordinates", 0]);
                expect(issues[0].message).toBe("Longitude must be less than or equal 180.");
            }
        }
    },
];

createSchemaTests({
    schema: CoordinateSchema,
    name: "CoordinateSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
