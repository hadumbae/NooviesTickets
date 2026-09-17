import {expect} from "vitest";
import {PersonSchema} from "./PersonSchema";
import {createSchemaTests, SchemaTestTask} from "../../../../utility/testing/createSchemaTests";
import {generateObjectIdPlaceholder} from "../../../../utility/testing/generateObjectIdPlaceholder";
import {generateSlug} from "../../../../utility/identifiers/generateSlug";

const validPersonOne = {
    _id: generateObjectIdPlaceholder(),
    slug: generateSlug("Person 1"),
    name: "Person 1",
    biography: "Person 1 Biography",
    dob: "1990-05-15T00:00:00.000Z",
    nationality: "US",
    profileImage: null,
};

const validPersonTwo = {
    _id: generateObjectIdPlaceholder(),
    slug: generateSlug("Person 2"),
    name: "Person 2",
    biography: "Person 2 Biography",
    dob: "1985-11-30T00:00:00.000Z",
    nationality: "GB",
};

const invalidPerson = {};

const validTasks: SchemaTestTask<typeof PersonSchema>[] = [
    {success: true, description: "valid full person", values: [validPersonOne]},
    {success: true, description: "valid person with no profile image", values: [validPersonTwo]},
];

const invalidTasks: SchemaTestTask<typeof PersonSchema>[] = [
    {
        success: false,
        description: "invalid, empty person",
        values: [invalidPerson],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(6);
            }
        }
    },
];

createSchemaTests({
    name: "PersonSchema",
    schema: PersonSchema,
    suites: [
        {description: "valid persons", tasks: validTasks},
        {description: "invalid persons", tasks: invalidTasks},
    ],
});
