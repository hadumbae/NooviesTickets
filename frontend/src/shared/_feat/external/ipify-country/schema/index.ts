import {
    IpifyLocalStorageData,
    IpifyLocalStorageSchema
} from "@/shared/_feat/external/ipify-country/schema/IpifyLocalStorageSchema.ts";
import {IpifyPayloadData, IpifyPayloadSchema} from "@/shared/_feat/external/ipify-country/schema/IpifyPayloadSchema.ts";
import {IpifyLocation, IpifyLocationSchema} from "@/shared/_feat/external/ipify-country/schema/IpifyLocationSchema.ts";

export {
    IpifyLocationSchema,
    IpifyPayloadSchema,
    IpifyLocalStorageSchema,
}

export type {
    IpifyLocation,
    IpifyPayloadData,
    IpifyLocalStorageData,
}

