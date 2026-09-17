import {Theatre, TheatreSchema} from "./TheatreSchema";
import {createSchemaTests, SchemaTestTask} from "../../../../utility/testing/createSchemaTests";
import {generateObjectIdPlaceholder} from "../../../../utility/testing/generateObjectIdPlaceholder";
import {generateSlug} from "../../../../utility/identifiers/generateSlug";

const validTheatreOne: Theatre = {
    _id: generateObjectIdPlaceholder(),
    name: "Theatre 1",
    location: {
        city: "Springfield",
        country: "US",
        timezone: "America/New_York",
    },
    seatCapacity: 250,
    slug: generateSlug("Theatre 1"),
};

const validTheatreTwo = {
    _id: generateObjectIdPlaceholder(),
    name: "Theatre 2",
    location: {
        street: "123 Main St",
        city: "Springfield",
        state: "Illinois",
        country: "US",
        postalCode: "62704",
        timezone: "America/New_York",
    },
    seatCapacity: "2500",
    slug: generateSlug("Theatre 2"),
};

const invalidTheatre = {};

const validTasks: SchemaTestTask<typeof TheatreSchema>[] = [
    {success: true, description: "valid theatre with minimal location", values: [validTheatreOne]},
    {success: true, description: "valid theatre with full location", values: [validTheatreTwo]},
];

const invalidTasks: SchemaTestTask<typeof TheatreSchema>[] = [
    {success: false, description: "invalid, empty theatre", values: [invalidTheatre]},
];

createSchemaTests({
    name: "TheatreSchema",
    schema: TheatreSchema,
    suites: [
        {description: "valid theatres", tasks: validTasks},
        {description: "invalid theatres", tasks: invalidTasks},
    ],
});
