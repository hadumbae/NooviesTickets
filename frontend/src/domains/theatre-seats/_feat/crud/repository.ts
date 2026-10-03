/**
 * @fileoverview CRUD operation handlers for theatre seat management.
 */

import {TheatreSeatCRUDBaseURL} from "@/domains/theatre-seats/_feat/crud/baseURL.ts";
import {
    handleCreate,
    handleDelete,
    handleFind,
    handleFindByID,
    handleFindBySlug,
    handlePaginated,
    handleQuery,
    handleUpdate
} from "@/shared/_feat/crud-handlers";

/** Standard CRUD methods bound to the TheatreSeat administrative API. */
export const find = handleFind(TheatreSeatCRUDBaseURL);
export const findByID = handleFindByID(TheatreSeatCRUDBaseURL);
export const findBySlug = handleFindBySlug(TheatreSeatCRUDBaseURL);

export const paginated = handlePaginated(TheatreSeatCRUDBaseURL);
export const query = handleQuery(TheatreSeatCRUDBaseURL);

export const create = handleCreate(TheatreSeatCRUDBaseURL);
export const update = handleUpdate(TheatreSeatCRUDBaseURL);
export const destroy = handleDelete(TheatreSeatCRUDBaseURL);
