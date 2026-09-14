/**
 * @fileoverview Utility for application-wide logging with support for different log levels and environments.
 */

import {LogPayload} from "@/shared/_feat/logger/Logger.types.ts";

const isDev = import.meta.env.VITE_DEV_MODE === 'true';
const isLoggingToConsole = import.meta.env.VITE_LOG_TO_CONSOLE === 'true';
const formatContext = ({context, error, type = "GENERAL"}: LogPayload) => {
    return {
        type,
        time: new Date().toISOString(),
        context: context ?? {},
        error: error
            ? {message: error.message, stack: error.stack}
            : {message: null, stack: null},
    };
};

/** Provides methods for logging information, warnings, debug data, and errors to the console. */
export const Logger = {
    log: (payload: LogPayload) => {
        const {msg} = payload;
        if (isDev || isLoggingToConsole) console.log("[INFO]", msg, formatContext(payload));
    },

    warn: (payload: LogPayload) => {
        const {msg} = payload;
        if (isDev || isLoggingToConsole) console.warn("[WARN]", msg, formatContext(payload));
    },

    debug: (payload: LogPayload) => {
        const {msg} = payload;
        if (isDev || isLoggingToConsole) console.debug("[DEBUG]", msg, formatContext(payload));
    },

    error: (payload: LogPayload) => {
        const {msg} = payload;
        console.error("[ERROR]", msg, formatContext(payload));
    },
};

/** Utility type that extracts valid method names from the Logger class. */
export type LoggerFunction = {
    [K in keyof typeof Logger]: typeof Logger[K] extends (...args: any[]) => any ? K : never
}[keyof typeof Logger];
