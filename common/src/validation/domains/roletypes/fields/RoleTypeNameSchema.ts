/**
 * @fileoverview Zod schema and type definition for the RoleType name field.
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "../../../schema/strings/NonEmptyStringSchema";

/** Schema for validating a RoleType name string. */
export const RoleTypeNameSchema = NonEmptyStringSchema.max(150, {message: "Max. 150 Characters"});

/** Type inferred from the RoleTypeNameSchema. */
export type RoleTypeName = z.infer<typeof RoleTypeNameSchema>;
