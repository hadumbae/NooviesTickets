/**
 * @fileoverview Custom hook for consuming the TheatreSeatPanelStateContext within the seat details panel.
 */

import {useContext} from "react";
import {
    TheatreSeatPanelStateContext,
    TheatreSeatPanelStateContextValues
} from "@/domains/theatre-seats/_feat/theatre-seat-details-context/context";

/**
 * Custom hook to safely consume the TheatreSeatPanelStateContext.
 */
export function useTheatreSeatPanelStateContext(): TheatreSeatPanelStateContextValues {
    const context = useContext(TheatreSeatPanelStateContext);

    if (!context) {
        throw new Error('useTheatreSeatPanelStateContext must be used within a TheatreSeatPanelContextProvider');
    }

    return context;
}
