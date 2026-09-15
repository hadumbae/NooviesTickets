/**
 * @fileoverview Defines a utility type for Mongoose documents that preserves schema properties.
 */

import type {Document} from "mongoose";
import type {BaseModel} from "@/shared/_types/model/BaseModel";

/** Represents a Mongoose document combined with its underlying schema interface. */
export type DocumentType<TSchema extends BaseModel> = Document<unknown, {}, TSchema> & TSchema;