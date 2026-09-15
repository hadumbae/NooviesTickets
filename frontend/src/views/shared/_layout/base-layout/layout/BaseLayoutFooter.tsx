/**
 * @fileoverview Footer component for the primary application base layout.
 */

import {ReactElement} from "react";

/** Renders the base application layout footer with a dynamic copyright year. */
export const BaseLayoutFooter = (): ReactElement => {
    const currentYear = (new Date()).getFullYear();

    return (
        <footer className="font-mono text-center text-neutral-500">
            <span className="text-xs lg:text-sm">
                All Rights Reserved <b>@ {currentYear}</b> | Noovies Ltd.
            </span>
        </footer>
    );
}