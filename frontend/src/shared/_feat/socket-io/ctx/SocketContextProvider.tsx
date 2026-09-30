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
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (!user) return;

        const instance = io(API_URL, {withCredentials: true});
        setSocket(instance);

        return () => {
            instance.disconnect();
            setSocket(null);
        }
    }, [user])

    const values: SocketContextValues = {
        socket,
    };

    return (
        <SocketContext.Provider value={values}>
            {children}
        </SocketContext.Provider>
    );
}