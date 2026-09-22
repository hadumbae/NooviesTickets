/**
 * @fileoverview React context for managing setter functions of the UI state in the Theatre Screen Details page.
 */

import {createContext, Dispatch, SetStateAction} from "react";

/** Values exposed by the theatre screen details UI setter context. */
export type TheatreScreenDetailsUISetterContextValues = {
    setIsEditing: Dispatch<SetStateAction<boolean>>;
    setShowDeleteWarning: Dispatch<SetStateAction<boolean>>;
};

/** React context providing setter functions for theatre screen details UI state. */
export const TheatreScreenDetailsUISetterContext =
    createContext<TheatreScreenDetailsUISetterContextValues | undefined>(undefined);

TheatreScreenDetailsUISetterContext.displayName = "TheatreScreenDetailsUISetterContext";
