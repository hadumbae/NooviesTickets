import {expect} from "vitest";
import {LocationSchema} from "./LocationSchema";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";

const fullLocation = {
    street: "123 Main St",
    city: "Springfield",
    state: "Illinois",
    country: "US",
    postalCode: "62704",
    timezone: "America/New_York",
    coordinates: {type: "Point", coordinates: [-89.6501, 39.7817]},
};

const minimalLocation = {
    city: "Springfield",
    country: "US",
    timezone: "America/New_York",
};

const validTasks: SchemaTestTask<typeof LocationSchema>[] = [
    {success: true, description: "a complete location with every optional field present", values: [fullLocation]},
    {
        success: true,
        description: "only the required fields present",
        values: [minimalLocation],
        callback: ({success, data}) => {
            if (success) {
                expect(data.street).toBeUndefined();
                expect(data.state).toBeUndefined();
                expect(data.postalCode).toBeUndefined();
                expect(data.coordinates).toBeUndefined();
            }
        }
    },
];

const invalidTasks: SchemaTestTask<typeof LocationSchema>[] = [
    {
        success: false,
        description: "an object missing every required field",
        values: [{}],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(3);
                expect(issues.map((issue) => issue.path)).toEqual(
                    expect.arrayContaining([["city"], ["country"], ["timezone"]])
                );
            }
        }
    },
];

createSchemaTests({
    schema: LocationSchema,
    name: "LocationSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
