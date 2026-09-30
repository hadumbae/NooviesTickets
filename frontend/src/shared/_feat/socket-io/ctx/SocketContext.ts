/**
 * @fileoverview React context for managing and sharing the Socket.io client instance across components.
 */

import {createContext} from "react";
import {Socket} from "socket.io-client";

/** Props for the SocketContextValues type. */
export type SocketContextValues = {
    socket: Socket | null;
}

/** Context providing the active Socket.io client instance. */
export const SocketContext = createContext<SocketContextValues | undefined>(undefined);