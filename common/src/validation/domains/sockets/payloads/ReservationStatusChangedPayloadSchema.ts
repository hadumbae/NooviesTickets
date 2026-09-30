/**
 * @fileoverview Validation schema and type for the RESERVATION_STATUS_CHANGED socket event payload.
 */

import {z} from "zod";
import {IDStringSchema} from "../../../schema/additional-strings/id-strings/IDStringSchema";
import {ZodEnumParamHandler} from "../../../schema/enums/handler/ZodEnumParamHandler";
import {SlugStringSchema} from "../../../../validation/schema";

/**
 * Subset of ReservationStatusConstant that clients need to react to in real time.
 * Deliberately excludes statuses (e.g. PAID, RUNNING, COMPLETED, REFUNDED, INVALID)
 * that don't require a live UI update.
 */
const BroadcastReservationStatusConstant = [
    "RESERVED",
    "CANCELLED",
    "EXPIRED",
] as const;

/** Zod schema for the payload broadcast when a reservation's status changes. */
export const ReservationStatusChangedPayloadSchema = z.object({
    reservationId: IDStringSchema,
    reservationSlug: SlugStringSchema,
    showingId: IDStringSchema,
    status: z.enum(BroadcastReservationStatusConstant, ZodEnumParamHandler({
        invalidType: "Must be a valid reservation status string.",
        invalidValue: "Must be a valid broadcastable reservation status."
    })),
});

/** TypeScript type inferred from the ReservationStatusChangedPayloadSchema. */
export type ReservationStatusChangedPayload = z.infer<typeof ReservationStatusChangedPayloadSchema>;
