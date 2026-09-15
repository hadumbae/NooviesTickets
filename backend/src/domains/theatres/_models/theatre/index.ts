import {TheatreSchema} from "@/domains/theatres/_models/theatre/Theatre.schema";
import type {
    TheatreSchemaFields,
    TheatreWithShowings,
    TheatreWithVirtuals
} from "@/domains/theatres/_models/theatre/Theatre.types";
import {TheatreModel} from "@/domains/theatres/_models/theatre/Theatre.model";

export {
    TheatreSchema,
    TheatreModel,
}

export type {
    TheatreSchemaFields,
    TheatreWithVirtuals,
    TheatreWithShowings,
}