/**
 * @fileoverview Socket.io server registration and connection middleware configuration.
 */

import {parse} from "cookie";
import {Server} from "socket.io";
import {Server as HttpServer} from "node:http";
import type {SocketEvent, SocketEventPayloadMap} from "@noovies-tickets/common";
import {getEnvVariables} from "@/shared/_feat/env/getEnvVariables";
import {decodeAuthToken} from "@/domains/authentication/_middleware/decodeAuthToken";

let io: Server | undefined;

/** Registers and configures the Socket.io server with authentication middleware and event listeners. */
export function registerSocketServer(
    server: HttpServer,
): Server {
    const { CORS_ALLOWED_ORIGINS } = getEnvVariables();
    io = new Server(server, {cors: {origin: CORS_ALLOWED_ORIGINS, credentials: true}});

    io.use((socket, next) => {
        try {
            const { authToken } = parse(socket.handshake.headers.cookie || "");
            if (!authToken) throw new Error("Authentication required: No token provided.");

            const { user, isAdmin, status } = decodeAuthToken(authToken);
            if (status !== "ACTIVE") throw new Error("Invalid user.");

            socket.data.userId = user._id;
            socket.data.isAdmin = isAdmin;
            next();
        } catch (error) {
            next(error instanceof Error ? error : new Error("Unauthorized."));
        }
    });

    io.on("connection", (socket) => {
        socket.on("join-showing", (showingId: string) => socket.join(showingId));
        socket.on("leave-showing", (showingId: string) => socket.leave(showingId));

        socket.on("join-reservation", (reservationId: string) => socket.join(reservationId));
        socket.on("leave-reservation", (reservationId: string) => socket.leave(reservationId));
    });

    return io;
}

/** Returns the registered Socket.io server instance. Throws if called before registerSocketServer. */
export function getSocketServer(): Server {
    if (!io) throw new Error("Socket server has not been registered yet.");
    return io;
}

/** Emits a socket event, with its payload type checked against the event name, to every socket in any of the given rooms. */
export function emitToRooms<E extends SocketEvent>(
    rooms: string[],
    event: E,
    payload: SocketEventPayloadMap[E],
): void {
    getSocketServer().to(rooms).emit(event, payload);
}