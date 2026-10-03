import {TheatreSeat, TheatreSeatSchema} from "./TheatreSeatSchema";
import {createSchemaTests, SchemaTestTask} from "../../../../utility/testing/createSchemaTests";
import {generateObjectIdPlaceholder} from "../../../../utility/testing/generateObjectIdPlaceholder";
import {generateSlug} from "../../../../utility/identifiers/generateSlug";

const validSeat: TheatreSeat = {
    _id: generateObjectIdPlaceholder(),
    row: "A",
    x: 1,
    y: 1,
    layoutType: "SEAT",
    slug: generateSlug("Seat A1"),
    theatre: generateObjectIdPlaceholder(),
    screen: generateObjectIdPlaceholder(),
    seatNumber: 1,
    seatLabel: "A1",
    seatType: "REGULAR",
    isAvailable: true,
    priceMultiplier: 1,
};

const validAisle = {
    _id: generateObjectIdPlaceholder(),
    row: "A",
    x: 2,
    y: 1,
    layoutType: "AISLE",
    slug: generateSlug("Aisle A2"),
    theatre: generateObjectIdPlaceholder(),
    screen: generateObjectIdPlaceholder(),
};

const validStair = {
    _id: generateObjectIdPlaceholder(),
    row: "B",
    x: 1,
    y: 2,
    layoutType: "STAIR",
    slug: generateSlug("Stair B1"),
    theatre: generateObjectIdPlaceholder(),
    screen: generateObjectIdPlaceholder(),
};

const invalidSeat = {};

const validTasks: SchemaTestTask<typeof TheatreSeatSchema>[] = [
    {success: true, description: "valid bookable seat", values: [validSeat]},
    {success: true, description: "valid aisle position", values: [validAisle]},
    {success: true, description: "valid stair position", values: [validStair]},
];

const invalidTasks: SchemaTestTask<typeof TheatreSeatSchema>[] = [
    {success: false, description: "invalid, empty seat", values: [invalidSeat]},
];

createSchemaTests({
    name: "TheatreSeatSchema",
    schema: TheatreSeatSchema,
    suites: [
        {description: "valid seats", tasks: validTasks},
        {description: "invalid seats", tasks: invalidTasks},
    ],
});
