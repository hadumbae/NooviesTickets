/**
 * @fileoverview Custom hook for consuming the TheatreSeatPanelSetterContext within the seat details panel.
 */

import {useContext} from "react";
import {
    TheatreSeatPanelSetterContext,
    TheatreSeatPanelSetterContextValues
} from "@/domains/theatre-seats/_feat/theatre-seat-details-context/context";

/**
 * Custom hook to safely consume the TheatreSeatPanelSetterContext.
 */
export function useTheatreSeatPanelSetterContext(): TheatreSeatPanelSetterContextValues {
    const context = useContext(TheatreSeatPanelSetterContext);

    if (!context) {
        throw new Error('useTheatreSeatPanelSetterContext must be used within a TheatreSeatPanelContextProvider');
    }

    return context;
}
