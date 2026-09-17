import {expect} from "vitest";
import {CloudinaryImageSchema} from "./CloudinaryImageSchema";
import {createSchemaTests, SchemaTestTask} from "../../../utility/testing/createSchemaTests";

const validImage = {
    public_id: "sample/image",
    secure_url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    version: 1234567890,
    width: 800,
    height: 600,
    format: "jpg",
    resource_type: "image",
    bytes: 102400,
    type: "upload",
    etag: "abc123",
    url: "http://res.cloudinary.com/demo/image/upload/sample.jpg",
    signature: "def456",
};

const validTasks: SchemaTestTask<typeof CloudinaryImageSchema>[] = [
    {success: true, description: "a complete valid Cloudinary image object", values: [validImage]},
    {
        success: true,
        description: "strips unknown keys",
        values: [{...validImage, extraField: "ignored"}],
        callback: ({success, data}) => {
            if (success) {
                expect(data).toEqual(validImage);
            }
        }
    },
];

const invalidTasks: SchemaTestTask<typeof CloudinaryImageSchema>[] = [
    {
        success: false,
        description: "missing entirely",
        values: [undefined],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message).toBe("Required");
            }
        }
    },
    {
        success: false,
        description: "non-object values",
        values: [null, "foo", 123, []],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(1);
                expect(issues[0].message.startsWith("Expected object, received")).toBe(true);
            }
        }
    },
    {
        success: false,
        description: "an object missing every required field",
        values: [{}],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(Object.keys(validImage).length);
                expect(issues.every((issue) => issue.message === "Required")).toBe(true);
            }
        }
    },
];

createSchemaTests({
    schema: CloudinaryImageSchema,
    name: "CloudinaryImageSchema",
    suites: [
        {description: "valid values", tasks: validTasks},
        {description: "invalid values", tasks: invalidTasks},
    ],
});
