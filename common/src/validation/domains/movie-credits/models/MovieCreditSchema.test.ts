import {MovieCredit, MovieCreditSchema} from "./MovieCreditSchema";
import {createSchemaTests, SchemaTestTask} from "../../../../utility/testing/createSchemaTests";
import {generateObjectIdPlaceholder} from "../../../../utility/testing/generateObjectIdPlaceholder";
import {generateSlug} from "../../../../utility/identifiers/generateSlug";

const validCastCredit: MovieCredit = {
    _id: generateObjectIdPlaceholder(),
    slug: generateSlug("Cast Credit"),
    department: "CAST",
    movie: generateObjectIdPlaceholder(),
    person: generateObjectIdPlaceholder(),
    roleType: generateObjectIdPlaceholder(),
    characterName: "Hero",
    isPrimary: true,
    voiceOnly: false,
    cameo: false,
    motionCapture: false,
    archiveFootage: false,
};

const validCrewCredit = {
    _id: generateObjectIdPlaceholder(),
    slug: generateSlug("Crew Credit"),
    department: "CREW",
    movie: generateObjectIdPlaceholder(),
    person: generateObjectIdPlaceholder(),
    roleType: generateObjectIdPlaceholder(),
};

const invalidCredit = {};

const validTasks: SchemaTestTask<typeof MovieCreditSchema>[] = [
    {success: true, description: "valid cast credit", values: [validCastCredit]},
    {success: true, description: "valid crew credit", values: [validCrewCredit]},
];

const invalidTasks: SchemaTestTask<typeof MovieCreditSchema>[] = [
    {success: false, description: "invalid, empty movie credit", values: [invalidCredit]},
];

createSchemaTests({
    name: "MovieCreditSchema",
    schema: MovieCreditSchema,
    suites: [
        {description: "valid movie credits", tasks: validTasks},
        {description: "invalid movie credits", tasks: invalidTasks},
    ],
});
