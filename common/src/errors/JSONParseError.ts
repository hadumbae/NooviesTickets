/**
 * @fileoverview Custom error class representing failure details when parsing JSON data.
 */

type ErrorParams = {
    raw: unknown;
    message?: string;
    statusCode?: number;
};

/** Custom error thrown when parsing JSON data fails. */
export class JSONParseError extends Error {
    public readonly raw: unknown;
    public readonly source?: string;
    public readonly statusCode?: number;

    constructor({raw, message, statusCode}: ErrorParams) {
        super(message);

        this.name = "JSONParseError";

        this.raw = raw;
        this.statusCode = statusCode;
    }

    toString(): string {
        return `[${this.name}] Failed to parse JSON`;
    }

    toJSON(): Record<string, any> {
        return {
            raw: this.raw,
            message: this.message,
            statusCode: this.statusCode,
        };
    }
}