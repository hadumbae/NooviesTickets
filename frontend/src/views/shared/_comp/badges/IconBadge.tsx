/**
 * @fileoverview Badge component displaying an icon alongside descriptive text with support for custom semantic variants.
 */

import {ReactElement} from "react";
import {LucideIcon} from "lucide-react";
import {cn} from "@/shared/_feat";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";

/** Props for the IconBadge component. */
type BadgeProps = {
    icon: LucideIcon;
    text: string;
    variant?: BadgeVariant;
};

/**
 * Renders a badge containing an icon and label styled according to the specified semantic variant.
 */
export function IconBadge(
    {text, icon: Icon, variant = "default"}: BadgeProps
): ReactElement {
    const variantCSS: Record<BadgeVariant, string> = {
        default: "border border-neutral-200 dark:border-neutral-600",
        success: "bg-green-500 text-green-800 dark:bg-green-800 dark:text-green-400",
        warning: "bg-yellow-400 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-500",
        danger: "bg-red-300 text-red-800 dark:bg-red-950 dark:text-red-300",
        info: "bg-blue-300 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
    };

    return (
        <div className={cn(
            "flex justify-left items-center p-2 space-x-2 rounded-xl text-sm",
            variantCSS[variant],
        )}>
            <Icon/>
            <span>{text}</span>
        </div>
    );
}