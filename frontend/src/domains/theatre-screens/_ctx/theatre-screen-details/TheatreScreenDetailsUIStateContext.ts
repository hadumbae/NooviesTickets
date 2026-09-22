/**
 * @fileoverview React context for managing UI state in the Theatre Screen Details page.
 */

import {createContext} from "react";

/** Values exposed by the theatre screen details UI state context. */
export type TheatreScreenDetailsUIStateContextValues = {
    isEditing: boolean;
    showDeleteWarning: boolean;
};

/** React context providing UI state for theatre screen details. */
export const TheatreScreenDetailsUIStateContext =
    createContext<TheatreScreenDetailsUIStateContextValues | undefined>(undefined);

TheatreScreenDetailsUIStateContext.displayName = "TheatreScreenDetailsUIStateContext";
