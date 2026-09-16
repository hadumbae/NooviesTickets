import {AnyValues} from "@/shared/_types/form/AnyValues.ts";
import {Genre, GenreSchema} from "@/domains/genres/_schema/genre/GenreSchema.ts";
import {createSchemaTests, generateObjectIdPlaceholder, generateSlug, SchemaTestTask} from "@noovies-tickets/common";
import {expect} from "vitest";

type TestValidGenre = AnyValues<Genre>;
type TestInvalidGenre = Partial<TestValidGenre>;

const validGenreOne: TestValidGenre = {
    _id: generateObjectIdPlaceholder(),
    name: "Genre 1",
    description: "Genre 1 Description",
    image: null,
    slug: generateSlug("Genre 1"),
    movieCount: 1,
    isFeatured: true,
};

const validGenreTwo: TestValidGenre = {
    _id: generateObjectIdPlaceholder(),
    name: "Genre 2",
    description: "Genre 2 Description",
    slug: generateSlug("Genre 2"),
    movieCount: 50,
    isFeatured: false,
};

const validGenreThree: TestValidGenre = {
    _id: generateObjectIdPlaceholder(),
    name: "Genre 3",
    description: "Genre 3 Description",
    slug: generateSlug("Genre 3"),
    movieCount: 150,
    isFeatured: "abc",
};

const invalidGenre: TestInvalidGenre = {};

const validTasks: SchemaTestTask<typeof GenreSchema>[] = [
    {success: true, description: "valid full genre", values: [validGenreOne]},
    {success: true, description: "valid genre with no image", values: [validGenreTwo]},
    {success: true, description: "valid genre with catch `isFeatured`", values: [validGenreThree]},
];

const invalidTasks: SchemaTestTask<typeof GenreSchema>[] = [
    {
        success: false,
        description: "invalid, empty genre",
        values: [invalidGenre],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues).toHaveLength(5);
            }
        }
    },
];

createSchemaTests({
    name: "GenreSchema",
    schema: GenreSchema,
    suites: [
        {description: "valid genres", tasks: validTasks},
        {description: "invalid genres", tasks: invalidTasks},
    ],
});

