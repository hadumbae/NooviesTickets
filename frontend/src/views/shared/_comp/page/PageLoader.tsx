/**
 * @fileoverview A centralized full-page loading component.
 * Centers a loader both horizontally and vertically to provide visual
 * feedback during data fetching or page transitions.
 */

import {ReactElement} from 'react';
import {ThreeDotsLoader} from "@/views/shared/_comp/loaders/ThreeDotsLoader.tsx";
import {cn} from "@/shared/_feat";

type LoaderProps = {
    className?: string;
};

/**
 * Renders a full-page loading state using a centered ThreeDotsLoader.
 */
export function PageLoader({className}: LoaderProps): ReactElement {
    return (
        <div className={cn(
            "w-full",
            "h-full",
            "flex",
            "justify-center",
            "items-center",
            className
        )}>
            <ThreeDotsLoader />
        </div>
    );
}