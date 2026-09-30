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
    const {CORS_ALLOWED_ORIGINS} = getEnvVariables();
    io = new Server(server, {cors: {origin: CORS_ALLOWED_ORIGINS, credentials: true}});

    io.use((socket, next) => {
        try {
            console.log(`[socket.io] handshake attempt from ${socket.handshake.address}`);
            console.log(`[socket.io] cookie header present: ${!!socket.handshake.headers.cookie}`);

            const {authToken} = parse(socket.handshake.headers.cookie || "");
            if (!authToken) throw new Error("Authentication required: No token provided.");

            const {user, isAdmin, status} = decodeAuthToken(authToken);
            if (status !== "ACTIVE") throw new Error("Invalid user.");

            socket.data.userId = user._id;
            socket.data.isAdmin = isAdmin;

            console.log(`[socket.io] handshake authenticated for userId=${user._id}`);
            next();
        } catch (error) {
            console.error(`[socket.io] handshake REJECTED:`, error instanceof Error ? error.message : error);
            next(error instanceof Error ? error : new Error("Unauthorized."));
        }
    });

    io.on("connection", (socket) => {
        console.log(`[socket.io] connected: socket.id=${socket.id}, userId=${socket.data.userId}`);

        socket.on("join-showing", (showingId: string) => {
            console.log(`[socket.io] ${socket.id} join-showing ${showingId}`);
            socket.join(showingId);
        });
        socket.on("leave-showing", (showingId: string) => {
            console.log(`[socket.io] ${socket.id} leave-showing ${showingId}`);
            socket.leave(showingId);
        });

        socket.on("join-reservation", (reservationId: string) => {
            console.log(`[socket.io] ${socket.id} join-reservation ${reservationId}`);
            socket.join(reservationId);
        });
        socket.on("leave-reservation", (reservationId: string) => {
            console.log(`[socket.io] ${socket.id} leave-reservation ${reservationId}`);
            socket.leave(reservationId);
        });

        socket.on("disconnect", (reason) => {
            console.log(`[socket.io] disconnected: socket.id=${socket.id}, reason=${reason}`);
        });
    });

    return io;
}

/** Returns the registered Socket.io server instance. Throws if called before registerSocketServer. */
export function getSocketServer(): Server {
    if (!io) throw new Error("Socket server has not been registered yet.");
    return io;
}

/** Emits a socket event, with its payload type checked against the event name, to every socket in any of the given rooms. */
export function emitToRooms<TEvent extends SocketEvent>(
    rooms: string[],
    event: TEvent,
    payload: SocketEventPayloadMap[TEvent],
): void {
    const server = getSocketServer();

    const recipientCount = rooms.reduce(
        (count, room) => count + (server.sockets.adapter.rooms.get(room)?.size ?? 0),
        0,
    );
    console.log(`[socket.io] emitting "${event}" to rooms [${rooms.join(", ")}] — ${recipientCount} socket(s) currently joined`, payload);

    server.to(rooms).emit(event, payload);
}