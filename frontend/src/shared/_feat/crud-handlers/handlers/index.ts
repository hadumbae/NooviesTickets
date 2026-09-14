import {FindDocumentsConfig, handleFind} from "@/shared/_feat/crud-handlers/handlers/handleFind.ts";
import {CreateDocumentConfig, handleCreate} from "@/shared/_feat/crud-handlers/handlers/handleCreate.ts";
import {DeleteDocumentConfig, handleDelete} from "@/shared/_feat/crud-handlers/handlers/handleDelete.ts";
import {FindDocumentByIDConfig, handleFindByID} from "@/shared/_feat/crud-handlers/handlers/handleFindByID.ts";
import {FindPaginatedDocumentsConfig, handlePaginated} from "@/shared/_feat/crud-handlers/handlers/handlePaginated.ts";
import {FindDocumentsByQueryConfig, handleQuery} from "@/shared/_feat/crud-handlers/handlers/handleQuery.ts";
import {handleUpdate, UpdateDocumentConfig} from "@/shared/_feat/crud-handlers/handlers/handleUpdate.ts";
import {handleSoftDelete, SoftDeleteDocumentConfig} from "@/shared/_feat/crud-handlers/handlers/handleSoftDelete.ts";
import {FindDocumentBySlugConfig, handleFindBySlug} from "@/shared/_feat/crud-handlers/handlers/handleFindBySlug.ts";

export {
    handleFind,
    handleCreate,
    handleDelete,
    handleFindByID,
    handlePaginated,
    handleQuery,
    handleUpdate,
    handleSoftDelete,
    handleFindBySlug,
}
export type {
    FindDocumentsConfig,
    CreateDocumentConfig,
    DeleteDocumentConfig,
    FindDocumentByIDConfig,
    FindPaginatedDocumentsConfig,
    FindDocumentsByQueryConfig,
    UpdateDocumentConfig,
    SoftDeleteDocumentConfig,
    FindDocumentBySlugConfig,
}
