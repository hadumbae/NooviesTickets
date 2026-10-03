/**
 * @fileoverview Database indexing strategy for the TheatreSeat model.
 */

import { TheatreSeatSchema } from "@/domains/theatre-seats/_models/TheatreSeat.schema";

/**
 * Natural Key Index:
 * Prevents duplicate seat numbers within the same row of a specific screen.
 */
TheatreSeatSchema.index(
    { theatre: 1, screen: 1, row: 1, seatNumber: 1 },
    { unique: true, partialFilterExpression: { seatNumber: { $exists: true } } },
);

/**
 * Spatial Grid Index:
 * Ensures only one layout element (seat, aisle, or stair) occupies a specific (x, y) coordinate.
 */
TheatreSeatSchema.index(
    { theatre: 1, screen: 1, x: 1, y: 1 },
    { unique: true },
);
