/**
 * @fileoverview Defines types and interfaces for the application logging system.
 */

/** Categories used to classify log messages. */
export type LogType =
    "GENERAL" |
    "INFO" |
    "WARNING" |
    "ERROR" |
    "FETCH" |
    "DATA" |
    "NAVIGATION";


/** Metadata object containing additional information for a log entry. */
export type LogContext = Record<string, unknown>;

/** Structure of a complete log entry payload. */
export type LogPayload = {
    type?: LogType;
    msg: string;
    context?: LogContext;
    error?: Error;
};
