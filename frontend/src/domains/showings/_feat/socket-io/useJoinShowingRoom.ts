/**
 * @fileoverview Hook for joining a specific showing's socket room and listening for status updates.
 */

import {ObjectIdString, SocketEventPayloadMap} from "@noovies-tickets/common";
import {useSocket} from "@/shared/_feat/socket-io/useSocket";
import {QueryKey, useQueryClient} from "@tanstack/react-query";
import {useEffect, useRef} from "react";
import {ShowingCRUDQueryKeys} from "@/domains/showings";

type HookConfig = {
    showingId: ObjectIdString | null;
    additionalInvalidateKeys?: QueryKey[];
}

/**
 * Joins a showing room via socket and invalidates relevant queries upon status change events.
 * Pass `additionalInvalidateKeys` for any query key outside the showing CRUD cache (e.g. a
 * view-specific hook) that should also be refreshed when this showing's status changes.
 */
export function useJoinShowingRoom(
    {showingId, additionalInvalidateKeys = []}: HookConfig
): void {
    const {socket} = useSocket();
    const queryClient = useQueryClient();

    // Held in a ref, not the effect's deps, so callers can pass an inline array
    // without causing a leave/rejoin cycle on every render.
    const additionalKeysRef = useRef(additionalInvalidateKeys);
    additionalKeysRef.current = additionalInvalidateKeys;

    useEffect(() => {
        if (!socket || showingId) return;

        socket.emit("join-showing", showingId);

        const handleStatusChanged = (payload: SocketEventPayloadMap["SHOWING_STATUS_CHANGED"]) => {
            if (payload.showingId !== showingId) return;

            queryClient.invalidateQueries({
                queryKey: ShowingCRUDQueryKeys._id({_id: payload.showingId}),
                exact: false,
            });

            queryClient.invalidateQueries({
                queryKey: ShowingCRUDQueryKeys.slug({slug: payload.showingSlug}),
                exact: false,
            });

            additionalKeysRef.current.forEach((queryKey) => {
                queryClient.invalidateQueries({queryKey, exact: false});
            });
        }

        socket.on("SHOWING_STATUS_CHANGED", handleStatusChanged);

        return () => {
            socket.emit("leave-showing", showingId);
            socket.off("SHOWING_STATUS_CHANGED", handleStatusChanged);
        };
    }, [socket, queryClient, showingId]);
}