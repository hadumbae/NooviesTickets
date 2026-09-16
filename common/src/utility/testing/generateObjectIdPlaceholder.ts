/**
 * @fileoverview Utility function for generating mock or placeholder MongoDB ObjectIDs.
 */

/** Generates a 24-character hexadecimal string representing a placeholder MongoDB ObjectId. */
export function generateObjectIdPlaceholder() {
    return Array
        .from({length: 24}, () => Math.floor(Math.random() * 16).toString(16))
        .join("");
}