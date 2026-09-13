/**
 * @fileoverview Defines the core interface for role types within the system.
 */

import type {RoleTypeDepartment} from "@noovies-tickets/common";
import {Types} from "mongoose";
import type {BaseModel} from "@/shared/_types/model/BaseModel";
import type {RoleTypeCastCategory, RoleTypeCrewCategory} from "@noovies-tickets/common";

/** Represents a specific role definition and its classification metadata. */
export type RoleTypeSchemaFields = BaseModel & {
    readonly _id: Types.ObjectId;
    roleName: string;
    category: RoleTypeCastCategory | RoleTypeCrewCategory;
    department: RoleTypeDepartment;
    description?: string;
}
