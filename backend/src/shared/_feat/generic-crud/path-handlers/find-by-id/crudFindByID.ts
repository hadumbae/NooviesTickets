/**
 * @file Generic controller and service for retrieving a single document by its unique identifier.
 * @filename crudFindByID.ts
 */

import populateQuery from "@/shared/utility/mongoose/populateQuery";
import type {BaseModel} from "@/shared/_types/model/BaseModel";
import type {Request, Response} from "express";
import {fetchRequestOptions} from "@/shared/_feat/fetch-request-options/utils";
import type {FindDocumentByIdConfig} from "@/shared/_feat/generic-crud/path-handlers/find-by-id/crudFindByID.types";
import type {CRUDControllerHandlerConfig} from "@/shared/_feat/generic-crud/types/CRUDControllerHandler";
import type {IDRouteConfig} from "@/shared/_schema/route-config";

/**
 * Retrieves a document from the database using its primary key, applying population and virtuals.
 * @param params - Configuration including model instance, ObjectId, and query options.
 * @returns A promise resolving to the found document.
 */
export const findDocumentById = async <TModel extends BaseModel>(
    {model, _id, populatePaths, options}: FindDocumentByIdConfig<TModel>
): Promise<TModel> => {
    const query = populateQuery({
        query: model.findById(_id),
        config: {...options, populatePaths},
    });

    return query.orFail();
}

/**
 * Factory function that generates an Express controller for ID-based lookups.
 * @param params - Configuration including the model and optional relationship paths.
 * @returns An asynchronous Express controller function.
 */
export const findById = <TModel extends BaseModel>(
    {model, populatePaths}: CRUDControllerHandlerConfig<TModel>
) => {
    return async (req: Request, res: Response) => {
        const {_id} = req.parsedConfig as IDRouteConfig;
        const options = fetchRequestOptions(req);

        const item = await findDocumentById({
            model,
            _id,
            populatePaths,
            options,
        });

        return res.status(200).json(item);
    }
}