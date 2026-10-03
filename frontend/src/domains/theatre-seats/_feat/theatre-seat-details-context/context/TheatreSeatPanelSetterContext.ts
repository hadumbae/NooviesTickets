/**
 * @fileoverview React context for managing the setter state of the seat details panel interface.
 */

import {createContext, Dispatch, SetStateAction} from "react";
import {TheatreSeatDetails} from "@/domains/theatre-seats/_schema";

/** Context values for managing setter functions for seat selection and panel visibility. */
export type TheatreSeatPanelSetterContextValues = {
    setSeat: Dispatch<SetStateAction<TheatreSeatDetails | null>>;
    setIsPanelOpen: Dispatch<SetStateAction<boolean>>;
};

/** Provides setter control functions for the seat details side panel and associated dialogs. */
export const TheatreSeatPanelSetterContext = createContext<TheatreSeatPanelSetterContextValues | undefined>(undefined);
