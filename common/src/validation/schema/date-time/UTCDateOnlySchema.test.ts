import {expect} from "vitest";
import {UTCDateOnlySchema} from "./UTCDateOnlySchema";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";

const validTasks: SchemaTestTask<typeof UTCDateOnlySchema>[] = [
    {
        success: true,
        description: "transforms into a Date at UTC midnight",
        values: ["2026-06-15"],
        callback: ({success, data}) => {
            if (success) {
                expect(data.toISOString()).toBe("2026-06-15T00:00:00.000Z");
            }
        }
    },
];

createSchemaTests({
    schema: UTCDateOnlySchema,
    name: "UTCDateOnlySchema",
    suites: [
        {description: "valid values", tasks: validTasks},
    ],
});
