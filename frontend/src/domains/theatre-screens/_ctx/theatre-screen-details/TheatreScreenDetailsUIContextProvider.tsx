/**
 * @fileoverview Provider component for the theatre screen details UI state and setter contexts.
 */

import {ReactElement, ReactNode, useState} from "react";
import {
    TheatreScreenDetailsUIStateContext,
    TheatreScreenDetailsUIStateContextValues
} from "@/domains/theatre-screens/_ctx/theatre-screen-details/TheatreScreenDetailsUIStateContext.ts";
import {
    TheatreScreenDetailsUISetterContext,
    TheatreScreenDetailsUISetterContextValues
} from "@/domains/theatre-screens/_ctx/theatre-screen-details/TheatreScreenDetailsUISetterContext.ts";

/** Props for the TheatreScreenDetailsUIContextProvider component. */
type ProviderProps = {
    children: ReactNode;
};

/** Provides the theatre screen details UI state and setter functions to child components. */
export function TheatreScreenDetailsUIContextProvider({children}: ProviderProps): ReactElement {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState<boolean>(false);

    const stateValues: TheatreScreenDetailsUIStateContextValues = {
        isEditing,
        showDeleteWarning,
    };

    const setterValues: TheatreScreenDetailsUISetterContextValues = {
        setIsEditing,
        setShowDeleteWarning,
    };

    return (
        <TheatreScreenDetailsUIStateContext.Provider value={stateValues}>
            <TheatreScreenDetailsUISetterContext.Provider value={setterValues}>
                {children}
            </TheatreScreenDetailsUISetterContext.Provider>
        </TheatreScreenDetailsUIStateContext.Provider>
    );
}
