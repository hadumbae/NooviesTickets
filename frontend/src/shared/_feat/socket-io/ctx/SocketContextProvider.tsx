/**
 * @fileoverview React context provider for establishing and managing a authenticated Socket.io client connection.
 */

import {ReactElement, ReactNode, useEffect, useState} from "react";
import {SocketContext, SocketContextValues} from "@/shared/_feat/socket-io/ctx/SocketContext.ts";
import {io, Socket} from "socket.io-client";
import {useAuthContext} from "@/domains/authentication";
import {API_URL} from "@/shared/_feat/fetch-api/apiEnvValues.ts";

/** Props for the SocketContextProvider component. */
type ProviderProps = {
    children: ReactNode;
};

/**
 * Provides an active Socket.io client instance to descendant components when authenticated.
 */
export function SocketContextProvider(
    {children}: ProviderProps
): ReactElement {
    const {user} = useAuthContext();
    const userId = user?._id;

    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (!userId) return;

        const instance = io(API_URL, {withCredentials: true});
        setSocket(instance);

        instance.on("connect", () => console.log("[socket.io] connected", instance.id));
        instance.on("connect_error", (error) => console.error("[socket.io] connect_error:", error.message));
        instance.on("disconnect", (reason) => console.log("[socket.io] disconnected:", reason));

        return () => {
            instance.disconnect();
            setSocket(null);
        }
    }, [userId])

    const values: SocketContextValues = {
        socket,
    };

    return (
        <SocketContext.Provider value={values}>
            {children}
        </SocketContext.Provider>
    );
}