import {MovieSchema} from "@/domains/movies/_models/movie/Movie.schema";
import type {MovieSchemaFields, MovieWithGenres, MovieWithRating} from "@/domains/movies/_models/movie/Movie.types";
import {MovieModel} from "@/domains/movies/_models/movie/Movie.model";

export {
    MovieSchema,
    MovieModel,
}

export type {
    MovieSchemaFields,
    MovieWithGenres,
    MovieWithRating,

}