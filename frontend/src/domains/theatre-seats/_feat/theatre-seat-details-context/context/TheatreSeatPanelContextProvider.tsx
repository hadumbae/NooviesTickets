/**
 * @fileoverview Provider for the seat details panel context, managing the state for viewing, editing, and deleting seats.
 */

import {ReactElement, ReactNode, useMemo, useState} from "react";
import {TheatreSeatDetails} from "@/domains/theatre-seats/_schema";
import {
    TheatreSeatPanelStateContext,
    TheatreSeatPanelStateContextValues,
} from "@/domains/theatre-seats/_feat/theatre-seat-details-context/context/TheatreSeatPanelStateContext.ts";
import {
    TheatreSeatPanelSetterContext,
    TheatreSeatPanelSetterContextValues,
} from "@/domains/theatre-seats/_feat/theatre-seat-details-context/context/TheatreSeatPanelSetterContext.ts";

/** Props for the TheatreSeatPanelContextProvider component. */
type ProviderProps = {
    children: ReactNode;
};

/** Manages state and setter functions for the seat details panel. */
export function TheatreSeatPanelContextProvider(
    {children}: ProviderProps
): ReactElement {
    const [seat, setSeat] = useState<TheatreSeatDetails | null>(null);
    const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

    const stateValues: TheatreSeatPanelStateContextValues = useMemo(() => ({
        seat,
        isPanelOpen,
    }), [seat, isPanelOpen]);

    const setterValues: TheatreSeatPanelSetterContextValues = useMemo(() => ({
        setSeat,
        setIsPanelOpen,
    }), []);

    return (
        <TheatreSeatPanelStateContext.Provider value={stateValues}>
            <TheatreSeatPanelSetterContext.Provider value={setterValues}>
                {children}
            </TheatreSeatPanelSetterContext.Provider>
        </TheatreSeatPanelStateContext.Provider>
    );
}
