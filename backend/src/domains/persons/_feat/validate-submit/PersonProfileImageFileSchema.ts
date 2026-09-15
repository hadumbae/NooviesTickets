/**
 * @fileoverview Zod schema for validating Person profile image file uploads.
 * Ensures the presence of a file and validates its Multer structure and MIME type.
 */

import {z} from "zod";
import refineRequiredImageFile from "@/shared/_utils/schema/validators/refineRequiredImageFile";

/**
 * Validates that an uploaded file is a valid image processed by Multer.
 */
export const PersonProfileImageFileSchema = z
    .object({file: z.any()})
    .superRefine(refineRequiredImageFile({pathName: "profileImage"}));

/**
 * Type representing the validated profile image file data.
 */
export type PersonProfileImageFileData = z.infer<typeof PersonProfileImageFileSchema>;