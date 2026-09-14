/**
 * @fileoverview Express handler for updating an existing Genre.
 */

import type {Request, Response} from "express";
import {fetchRequestOptions} from "@/shared/_feat/fetch-request-options/utils";
import {updateDocument} from "@/shared/_feat/generic-crud/path-handlers";
import {GenreModel, handleGenreDuplicateIndex} from "@/domains/genres/_models/genre";
import type {IDRouteConfig} from "@/shared/_schema/route-config";

/**
 * Updates a Genre document by ID, handling field synchronization and unsetting.
 */
export function genreUpdate() {
    return async (req: Request, res: Response) => {
        const {_id} = req.parsedConfig as IDRouteConfig;
        const options = fetchRequestOptions(req);

        const data = req.validatedBody;
        const unset = req.unsetFields;

        const item = await updateDocument({
            model: GenreModel,
            _id,
            options,
            data,
            unset,
            onDuplicateIndex: handleGenreDuplicateIndex,
        });

        return res.status(200).json(item);
    };
}