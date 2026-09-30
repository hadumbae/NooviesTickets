/**
 * @fileoverview Custom hook for consuming the Socket.io context.
 * Requires wrapping in a SocketContextProvider.
 */

import {SocketContext} from "@/shared/_feat/socket-io/ctx/SocketContext.ts";
import {useRequiredContext} from "@/shared/_feat";

/**
 * Returns the active Socket.io context values.
 */
export function useSocket() {
    return useRequiredContext({
        context: SocketContext,
        message: "Must be used within a provider for the Socket IO context.",
    });
}