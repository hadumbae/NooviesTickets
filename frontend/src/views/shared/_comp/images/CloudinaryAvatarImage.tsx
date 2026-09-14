/**
 * @fileoverview Avatar component that renders Cloudinary images or fallback initials.
 */

import {ReactElement} from 'react';
import type {CloudinaryImage} from "@noovies-tickets/common";
import {Avatar, AvatarFallback, AvatarImage} from "@/views/shared/_comp/ui/avatar.tsx";
import {getInitials} from "@/shared/_feat/formatters/getInitials.ts";
import {cn} from "@/shared/_feat";

/** Props for the CloudinaryAvatarImage component. */
type AvatarProps = {
    personName: string;
    image?: CloudinaryImage | null;
    className?: string;
}

/**
 * Displays a user avatar using a Cloudinary image source with a fallback to name initials.
 */
export function CloudinaryAvatarImage(
    {image, personName, className}: AvatarProps
): ReactElement {
    return (
        <Avatar className={cn("h-24 w-24", className)}>
            <AvatarImage className="object-cover object-center" src={image?.secure_url}/>
            <AvatarFallback className="select-none">{getInitials(personName).toUpperCase()}</AvatarFallback>
        </Avatar>
    );
}
