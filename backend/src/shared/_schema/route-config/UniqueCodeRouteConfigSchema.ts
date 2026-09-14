/**
 * @fileoverview Defines the Zod schema and type for unique-code-based route configurations.
 */

import {z} from "zod";
import {UniqueCodeSchema} from "@/shared/_schema/codes";

/** Zod schema for validating unique code route configuration objects. */
export const UniqueCodeRouteConfigSchema = z.object({
    uniqueCode: UniqueCodeSchema,
});

/** Type definition for a unique code route configuration. */
export type UniqueCodeRouteConfig = z.infer<typeof UniqueCodeRouteConfigSchema>;
