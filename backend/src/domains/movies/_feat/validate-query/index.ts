import {type MovieQuerySorts, MovieQuerySortSchema} from "@noovies-tickets/common";
import {
    type MovieRequestQueryFilters,
    MovieRequestQueryFiltersSchema
} from "@/domains/movies/_feat/validate-query/MovieRequestQueryFiltersSchema";
import {
    type MovieRequestQuery,
    MovieRequestQuerySchema
} from "@/domains/movies/_feat/validate-query/MovieRequestQuerySchema";
import {
    type MovieQueryMatchStage,
    MovieQueryMatchStageSchema
} from "@/domains/movies/_feat/validate-query/MovieQueryMatchStageSchema";
import {
    type MovieQuerySortStage,
    MovieQuerySortStageSchema
} from "@/domains/movies/_feat/validate-query/MovieQuerySortStageSchema";

export {
    MovieRequestQuerySchema,
    MovieRequestQueryFiltersSchema,
    MovieQuerySortSchema,
    MovieQueryMatchStageSchema,
    MovieQuerySortStageSchema,
}

export type {
    MovieRequestQuery,
    MovieRequestQueryFilters,
    MovieQuerySorts,
    MovieQueryMatchStage,
    MovieQuerySortStage,
}
