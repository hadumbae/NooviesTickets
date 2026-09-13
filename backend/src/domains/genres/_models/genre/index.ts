import {GenreModel} from "@/domains/genres/_models/genre/Genre.model";
import {GenreSchema} from "@/domains/genres/_models/genre/Genre.schema";
import type {GenreSchemaFields} from "@/domains/genres/_models/genre/Genre.types";
import {handleGenreDuplicateIndex} from "@/domains/genres/_models/genre/Genre.handlers";

export {
    GenreModel,
    GenreSchema,
    handleGenreDuplicateIndex,
}


export type {
    GenreSchemaFields,
}
