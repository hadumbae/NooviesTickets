/**
 * @fileoverview Utility function for generating random alphanumeric strings of a specified length.
 */

/** Generates a random alphanumeric string of the specified length. */
export function generateAlphanumericString(len: number = 10) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";

    for (let i = 0; i < len; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        randomString += chars[randomIndex];
    }

    return randomString;
}