import {deleteProfileImage, updateProfileImage} from "@/domains/persons/_feat/update-image/service";
import type {
    RemovePersonProfileImageConfig,
    UploadPersonProfileImageConfig
} from "@/domains/persons/_feat/update-image/service.types";
import {deleteRemoveProfileImage, patchUpdateProfileImage} from "@/domains/persons/_feat/update-image/controller";
import {PersonAdminImageManagementRoutes} from "@/domains/persons/_feat/update-image/routes";
import {hasProfileImage} from "@/domains/persons/_feat/update-image/hasProfileImage";

export {
    updateProfileImage,
    deleteProfileImage,
    patchUpdateProfileImage,
    deleteRemoveProfileImage,
    PersonAdminImageManagementRoutes,
    hasProfileImage,
}
export type {
    UploadPersonProfileImageConfig,
    RemovePersonProfileImageConfig,
}

