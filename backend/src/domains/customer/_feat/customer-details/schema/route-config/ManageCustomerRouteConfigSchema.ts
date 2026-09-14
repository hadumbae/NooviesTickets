/**
 * @fileoverview Defines the schema and type for customer management route configuration.
 */

import {z} from "zod";
import {ObjectIdSchema} from "@/shared/_schema/mongoose/ObjectIdSchema";

/** Zod validation schema for customer management route parameters. */
export const ManageCustomerRouteConfigSchema = z.object({
    userId: ObjectIdSchema,
});

/** Type definition for customer management route configuration. */
export type ManageCustomerRouteConfig = z.infer<typeof ManageCustomerRouteConfigSchema>;