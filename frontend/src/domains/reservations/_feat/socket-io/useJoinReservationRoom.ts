/**
 * @fileoverview Hook for joining a specific reservation's socket room and listening for status updates.
 */

import {useEffect, useRef} from "react";
import {QueryKey, useQueryClient} from "@tanstack/react-query";
import {ObjectIdString, SocketEventPayloadMap} from "@noovies-tickets/common";
import {useSocket} from "@/shared/_feat/socket-io/useSocket.ts";
import {ReservationCRUDQueryKeys} from "@/domains/reservations/_feat/crud-hooks/queryKeys";

type HookConfig = {
    reservationId: ObjectIdString | null;
    additionalInvalidateKeys?: QueryKey[];
}

/**
 * Joins a reservation room via socket and invalidates relevant queries upon status change events.
 * `reservationId` may be `null` for pages that render before a reservation is resolved (e.g. an
 * admin lookup form) — the hook simply doesn't join until a real id is passed.
 * Pass `additionalInvalidateKeys` for any query key outside the reservation CRUD cache (e.g. the
 * current-user reservations list, fetch-by-code, or a customer-view hook) that should also be
 * refreshed when this reservation's status changes.
 */
export function useJoinReservationRoom(
    {reservationId, additionalInvalidateKeys = []}: HookConfig
): void {
    const {socket} = useSocket();
    const queryClient = useQueryClient();

    // Held in a ref, not the effect's deps, so callers can pass an inline array
    // without causing a leave/rejoin cycle on every render.
    const additionalKeysRef = useRef(additionalInvalidateKeys);
    additionalKeysRef.current = additionalInvalidateKeys;

    useEffect(() => {
        if (!socket || !reservationId) return;

        socket.emit("join-reservation", reservationId);

        const handleStatusChanged = (payload: SocketEventPayloadMap["RESERVATION_STATUS_CHANGED"]) => {
            if (payload.reservationId !== reservationId) return;

            queryClient.invalidateQueries({
                queryKey: ReservationCRUDQueryKeys._id({_id: payload.reservationId}),
                exact: false,
            });

            queryClient.invalidateQueries({
                queryKey: ReservationCRUDQueryKeys.slug({slug: payload.reservationSlug}),
                exact: false,
            });

            additionalKeysRef.current.forEach((queryKey) => {
                queryClient.invalidateQueries({queryKey, exact: false});
            });
        }

        socket.on("RESERVATION_STATUS_CHANGED", handleStatusChanged);

        return () => {
            socket.emit("leave-reservation", reservationId);
            socket.off("RESERVATION_STATUS_CHANGED", handleStatusChanged);
        }
    }, [socket, queryClient, reservationId]);
}