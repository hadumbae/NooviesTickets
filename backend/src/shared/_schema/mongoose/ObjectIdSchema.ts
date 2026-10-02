/**
 * @fileoverview Zod schema for validating and coercing MongoDB ObjectId values.
 */

import {Types} from "mongoose";
import {ObjectIdStringSchema} from "./ObjectIdStringSchema.js";
import {z} from "zod";

/** Schema that validates Hex strings or ObjectId instances and transforms them into Types.ObjectId. */
export const ObjectIdSchema = z
    .union(
        [z.instanceof(Types.ObjectId, {message: "Must be a valid ObjectId object."}), ObjectIdStringSchema],
        {required_error: "Required", invalid_type_error: "Must be a valid ObjectId object or a derived string."}
    )
    .transform(id => (typeof id === "string" ? new Types.ObjectId(id) : id));