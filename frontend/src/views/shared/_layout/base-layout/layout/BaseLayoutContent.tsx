/**
 * @fileoverview Main content area wrapper for the base layout.
 */

import {ReactElement} from 'react';
import {Outlet} from "react-router-dom";
import {Bounce, ToastContainer} from "react-toastify";
import {cn} from "@/shared/_feat/handle-ui/cn.ts";
import {AppErrorBoundary} from "@/views/shared/_feat/error-boundary/app-error-boundary/boundary/AppErrorBoundary.tsx";

/** Renders the routed content inside an error boundary alongside the global toast container. */
export function BaseLayoutContent(): ReactElement {
    return (
        <section className={cn(
            "flex-1 font-offside py-5",
            "max-w-screen-2xl max-md:w-full",
            "xl:mx-36",
        )}>
            <AppErrorBoundary>
                <Outlet/>
            </AppErrorBoundary>

            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </section>
    );
}

