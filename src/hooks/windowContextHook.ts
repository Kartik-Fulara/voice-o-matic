import { useWindowsHookType } from "@typings/windowsTypes.d";
import { useContext } from "react";
import { WindowsContext } from "@features/windowsContext";

export const useWindowsContext = (): useWindowsHookType => {
  const context = useContext(WindowsContext);

  if (!context) {
    throw new Error(
      "useWindowsContext hook must be used within WindowsContextProvider"
    );
  }

  const {
    state: { rememberSelect, changeCollection,maximize },
    toggleChangeCollection,
    setRememberSelect,
    setMaximize,
  }: useWindowsHookType = context;

  return {
    state: { rememberSelect, changeCollection, maximize },
    setRememberSelect,
    toggleChangeCollection,
    setMaximize,
  };
};

export default useWindowsContext;
