/**
 * @fileoverview Provider composition component wrapping the movie details page with relevant UI state contexts.
 */

import {ReactElement, ReactNode} from "react";
import {IsDeletingUIContextProvider} from "@/shared/_ctx/ui";
import {
    IsDeletingMovieBannerUIContextProvider,
    IsDeletingMoviePosterUIContextProvider,
    IsUpdatingMovieBannerUIContextProvider,
    IsUpdatingMoviePosterUIContextProvider
} from "@/domains/movies/_ctx/ui";

/** Props for the MovieDetailsPageContext component. */
type ContextProps = {
    children: ReactNode;
};

/** Wraps children with context providers for managing movie details UI actions and deletion/update state. */
export function MovieDetailsPageContext(
    {children}: ContextProps
): ReactElement {
    return (
        <IsDeletingUIContextProvider>
            <IsUpdatingMoviePosterUIContextProvider>
                <IsDeletingMoviePosterUIContextProvider>
                    <IsUpdatingMovieBannerUIContextProvider>
                        <IsDeletingMovieBannerUIContextProvider>
                            {children}
                        </IsDeletingMovieBannerUIContextProvider>
                    </IsUpdatingMovieBannerUIContextProvider>
                </IsDeletingMoviePosterUIContextProvider>
            </IsUpdatingMoviePosterUIContextProvider>
        </IsDeletingUIContextProvider>
    );
}