/**
 * @fileoverview Constant list of all Socket.IO event names emitted by the backend.
 */

/** Tuple array containing the authoritative set of real-time socket event names. */
export const SocketEventConstant = [
    "SEAT_LOCKED",
    "SEAT_RELEASED",
    "RESERVATION_STATUS_CHANGED",
    "SHOWING_EXPIRED",
] as const;
