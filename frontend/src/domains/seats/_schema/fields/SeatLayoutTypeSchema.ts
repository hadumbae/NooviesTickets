/**
 * @fileoverview Zod schema and TypeScript type for validating seat layout types.
 */

import {z} from "zod";
import {SeatLayoutTypeConstant} from "@/domains/seats/_schema/constants";
import {ZodEnumParamHandler} from "@noovies-tickets/common";

/** Zod schema for validating seat layout types. */
export const SeatLayoutTypeSchema = z.enum(SeatLayoutTypeConstant, ZodEnumParamHandler());

/** TypeScript type representing a valid seat layout type. */
export type SeatLayoutType = z.infer<typeof SeatLayoutTypeSchema>;