"use client"

import React, { useReducer, useCallback, createContext, ReactElement } from 'react'
import {
    WINDOWS_ACTIONS_TYPES,
    initialStateType,
    UseWindowsHookType,
    useWindowsHookType,
} from "@typings/windowsTypes.d"

import reducer from "./reducer/windowsContextReducer";

const initialState: initialStateType = {
    rememberSelect: {
        selected: false,
        selectedType: "",
    },
    changeCollection: false,
    maximize: false,
};

const useWindowsContext = (initialState: initialStateType) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setRememberSelect = useCallback((rememberSelect: { selected: boolean, selectedType: string }) => {
        dispatch({
            type: WINDOWS_ACTIONS_TYPES.SET_REMEMBER_SELECT,
            payload: rememberSelect,
        });
    }, [dispatch]);

    const toggleChangeCollection = useCallback(() => {
        dispatch({
            type: WINDOWS_ACTIONS_TYPES.TOGGLE_CHANGE_COLLECTION,
        });
    }   , [dispatch]);

    const setMaximize = useCallback((maximize: boolean) => {
        dispatch({
            type: WINDOWS_ACTIONS_TYPES.TOGGLE_MAXIMIZE,
            payload: maximize,
        });
    }, [dispatch]);

    return {
        state,
        setRememberSelect,
        toggleChangeCollection,
        setMaximize,
    }

}

const initWindowsState: useWindowsHookType = {
    state: initialState,
    setRememberSelect: () => { },
    toggleChangeCollection: () => { },
    setMaximize: () => { },
}

const WindowsContext = createContext<UseWindowsHookType>(initWindowsState);

type ChildrenType = {
    children: ReactElement | ReactElement[] | React.ReactNode | undefined
}

const WindowsProvider = ({
    children
}: ChildrenType): ReactElement => {
    return (
        <>
            <WindowsContext.Provider value={useWindowsContext(initialState)}>
                {children}
            </WindowsContext.Provider>
        </>
    )
}

export default WindowsProvider;

export { WindowsContext, useWindowsContext, initWindowsState };