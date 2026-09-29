/**
 * @fileoverview Validation schema and type for recognised Socket.IO event names.
 */

import {z} from "zod";
import {SocketEventConstant} from "./SocketEventConstant";
import {ZodEnumParamHandler} from "../../../schema/enums/handler/ZodEnumParamHandler";

/** Zod schema validating that a string matches a recognised socket event name. */
export const SocketEventSchema = z.enum(SocketEventConstant, ZodEnumParamHandler({
    invalidType: "Must be a valid socket event string.",
    invalidValue: "Must be a valid socket event."
}));

/** TypeScript type inferred from the SocketEventSchema. */
export type SocketEvent = z.infer<typeof SocketEventSchema>;
