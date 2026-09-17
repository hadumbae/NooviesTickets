import {expect} from "vitest";
import {MovieSchema} from "./MovieSchema";
import {createSchemaTests, SchemaTestTask} from "../../../../utility/testing/createSchemaTests";
import {generateObjectIdPlaceholder} from "../../../../utility/testing/generateObjectIdPlaceholder";
import {generateSlug} from "../../../../utility/identifiers/generateSlug";

const validReleasedMovie = {
    _id: generateObjectIdPlaceholder(),
    slug: generateSlug("Movie 1"),
    title: "Movie 1",
    genres: [generateObjectIdPlaceholder()],
    country: "US",
    synopsis: "A synopsis.",
    runtime: 120,
    trailerURL: null,
    languages: ["en"],
    subtitles: ["en"],
    originalLanguage: "en",
    releaseDate: "2023-01-01T00:00:00.000Z",
    isReleased: true,
    isAvailable: true,
};

const validUnreleasedMovie = {
    _id: generateObjectIdPlaceholder(),
    slug: generateSlug("Movie 2"),
    title: "Movie 2",
    genres: [],
    country: "US",
    synopsis: "Another synopsis.",
    runtime: 90,
    languages: ["en"],
    subtitles: [],
    originalLanguage: "en",
    isReleased: false,
    isAvailable: false,
};

const invalidMovie = {};

const invalidReleasedMovieMissingDate = {
    ...validUnreleasedMovie,
    isReleased: true,
    releaseDate: null,
};

const validTasks: SchemaTestTask<typeof MovieSchema>[] = [
    {success: true, description: "valid released movie", values: [validReleasedMovie]},
    {success: true, description: "valid unreleased movie without a release date", values: [validUnreleasedMovie]},
];

const invalidTasks: SchemaTestTask<typeof MovieSchema>[] = [
    {success: false, description: "invalid, empty movie", values: [invalidMovie]},
    {
        success: false,
        description: "released movie missing a release date",
        values: [invalidReleasedMovieMissingDate],
        callback: ({success, error}) => {
            if (!success) {
                const {issues} = error;

                expect(issues.some((issue) => issue.path.join(".") === "releaseDate")).toBe(true);
            }
        }
    },
];

createSchemaTests({
    name: "MovieSchema",
    schema: MovieSchema,
    suites: [
        {description: "valid movies", tasks: validTasks},
        {description: "invalid movies", tasks: invalidTasks},
    ],
});
