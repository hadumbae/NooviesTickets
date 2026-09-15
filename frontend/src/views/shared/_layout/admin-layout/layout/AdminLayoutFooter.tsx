/**
 * @fileoverview Footer component for the administrative dashboard layout.
 */

import {ReactElement} from 'react';

/** Renders the admin dashboard footer with dynamic copyright year. */
export function AdminLayoutFooter(): ReactElement {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="font-mono text-center text-neutral-500">
            <span className="text-xs lg:text-sm">
                All Rights Reserved <b>@ {currentYear}</b> | Noovies Ltd.
            </span>
        </footer>
    );
}