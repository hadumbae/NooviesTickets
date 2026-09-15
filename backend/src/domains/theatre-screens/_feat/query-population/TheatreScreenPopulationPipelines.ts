/**
 * @file Aggregation pipelines for populating screen relations.
 * @filename TheatreScreenPopulationPipelines.ts
 */

import type {PopulationPipelineStages} from "@/shared/_types";

/**
 * Populates the `theatre` reference via `$lookup` and flattens the result.
 */
export const TheatreScreenPopulationPipelines: PopulationPipelineStages = [
    {
        $lookup: {
            from: "theatres",
            localField: "theatre",
            foreignField: "_id",
            as: "theatre",
        },
    },
    {
        $unwind: "$theatre",
    }
];