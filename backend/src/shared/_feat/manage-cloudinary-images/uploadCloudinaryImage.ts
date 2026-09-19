/**
 * @fileoverview Service function for uploading an image to Cloudinary and validating the response schema.
 */

import {
    type CloudinaryImage as CloudinaryImageObject,
    CloudinaryImageSchema as CloudinaryImageObjectSchema,
    ValidationError
} from "@noovies-tickets/common";
import {Cloudinary} from "@/config/cloudinary";
import type {MulterImageFile} from "@/shared/_feat/manage-multer-images";

type UploadImageConfig = {
    image: MulterImageFile
}

/**
 * Uploads an image buffer to Cloudinary and parses the response against the Cloudinary image object schema.
 */
export async function uploadCloudinaryImage(
    {image}: UploadImageConfig
): Promise<CloudinaryImageObject> {
    const imageBuffer = image.buffer;
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);
    const imageBase64 = imageData.toString('base64');

    const uploadFile = `data:image/png;base64,${imageBase64}`;
    const uploadOptions = {folder: 'propertypulse'};
    const response = await Cloudinary.uploader.upload(uploadFile, uploadOptions);

    const {error, success, data} = CloudinaryImageObjectSchema.safeParse(response);

    if (!success) {
        throw new ValidationError({
            raw: response,
            errorCode: "ERR_REQUEST_VALIDATION",
            message: "Invalid return from Cloudinary. Please check image data and try again.",
            errors: error?.errors,
            statusCode: 422,
        });
    }

    return data;
}

