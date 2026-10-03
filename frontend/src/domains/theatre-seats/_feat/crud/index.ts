import {
    create,
    destroy,
    find,
    findByID,
    findBySlug,
    paginated,
    query,
    update
} from "@/domains/theatre-seats/_feat/crud/repository.ts";
import {TheatreSeatCRUDBaseURL} from "@/domains/theatre-seats/_feat/crud/baseURL.ts";

export {
    TheatreSeatCRUDBaseURL,
    find,
    findByID,
    findBySlug,
    paginated,
    query,
    create,
    update,
    destroy,
}
