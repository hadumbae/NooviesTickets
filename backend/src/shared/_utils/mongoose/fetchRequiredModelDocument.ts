/**
 * @file Required document fetch utility.
 * @filename fetchRequiredModelDocument.ts
 */

import type {BaseModel} from "@/shared/_types/model/BaseModel";
import type {QueryConfig} from "@/shared/_types/query-config/QueryConfig";
import populateQuery from "./populateQuery.js";
import type {DocumentType} from "@/shared/_types/mongoose/DocumentType";
import createHttpError from "http-errors";
import {type Model, Types} from "mongoose";
import type {SlugString} from "@noovies-tickets/common";

/** Parameters for fetching a required document by either its ObjectId or unique slug. */
type FetchRequiredByIdentifierConfig<TSchema extends BaseModel> = {
    model: Model<TSchema>;
    options?: Omit<QueryConfig, "limit">;
    notFoundMessage?: string;
} & (
    | { _id: Types.ObjectId; slug?: never }
    | { _id?: never; slug: SlugString }
);

/**
 * Fetches a single document by `_id` or `slug`.
 *
 * Throws a `404` error when no document is found.
 *
 * @typeParam TSchema - Schema field shape for the model.
 */
export async function fetchRequiredModelDocument<TSchema extends BaseModel>(
    {model, _id, slug, options, notFoundMessage}: FetchRequiredByIdentifierConfig<TSchema>
): Promise<DocumentType<TSchema>> {
    const filter = _id ? {_id} : {slug};
    const query = model.findOne(filter);

    const doc = await populateQuery({query, config: options});

    if (!doc) {
        throw createHttpError(404, notFoundMessage ?? "Not Found.")
    }

    return doc;
}