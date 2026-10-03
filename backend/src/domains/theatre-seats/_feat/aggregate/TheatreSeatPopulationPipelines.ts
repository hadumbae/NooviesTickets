/**
 * @fileoverview MongoDB aggregation stages for populating TheatreSeat document references.
 */


import type {PopulationPipelineStages} from "@/shared/_types";

/**
 * Aggregation pipeline that materializes 'screen' and 'theatre' references for TheatreSeat documents.
 */
export const TheatreSeatPopulationPipelines: PopulationPipelineStages = [
    {
        $lookup: {
            from: "theatrescreens",
            localField: "screen",
            foreignField: "_id",
            as: "screen",
        },
    },
    {
        $lookup: {
            from: "theatres",
            localField: "theatre",
            foreignField: "_id",
            as: "theatre",
        },
    },
    {
        $unwind: "$screen",
    },
    {
        $unwind: "$theatre",
    },
];
