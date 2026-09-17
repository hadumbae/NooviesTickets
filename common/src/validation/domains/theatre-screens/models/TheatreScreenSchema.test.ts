import {TheatreScreen, TheatreScreenSchema} from "./TheatreScreenSchema";
import {createSchemaTests, SchemaTestTask} from "../../../../utility/testing/createSchemaTests";
import {generateObjectIdPlaceholder} from "../../../../utility/testing/generateObjectIdPlaceholder";
import {generateSlug} from "../../../../utility/identifiers/generateSlug";

const validScreenOne: TheatreScreen = {
    _id: generateObjectIdPlaceholder(),
    name: "Screen 1",
    capacity: 120,
    screenType: "2D",
    theatre: generateObjectIdPlaceholder(),
    slug: generateSlug("Screen 1"),
};

const validScreenTwo = {
    _id: generateObjectIdPlaceholder(),
    name: "Screen 2",
    capacity: "250",
    screenType: "IMAX",
    theatre: generateObjectIdPlaceholder(),
    slug: generateSlug("Screen 2"),
};

const invalidScreen = {};

const validTasks: SchemaTestTask<typeof TheatreScreenSchema>[] = [
    {success: true, description: "valid theatre screen", values: [validScreenOne]},
    {success: true, description: "valid theatre screen with coerced capacity", values: [validScreenTwo]},
];

const invalidTasks: SchemaTestTask<typeof TheatreScreenSchema>[] = [
    {success: false, description: "invalid, empty theatre screen", values: [invalidScreen]},
];

createSchemaTests({
    name: "TheatreScreenSchema",
    schema: TheatreScreenSchema,
    suites: [
        {description: "valid theatre screens", tasks: validTasks},
        {description: "invalid theatre screens", tasks: invalidTasks},
    ],
});
