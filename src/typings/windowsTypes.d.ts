import { useWindowsContext } from "@features/windowsContext";

type initialStateType = {
  rememberSelect: {
    selected: boolean;
    selectedType: string;
  };
  changeCollection:boolean
  maximize: boolean;
};

const WINDOWS_ACTIONS_TYPES = {
  SET_REMEMBER_SELECT: "SET_REMEMBER_SELECT",
  TOGGLE_CHANGE_COLLECTION: "TOGGLE_CHANGE_COLLECTION",
  TOGGLE_MAXIMIZE: "TOGGLE_MAXIMIZE",
} as const;

type ReducerActionType = {
  type: keyof typeof WINDOWS_ACTIONS_TYPES;
  payload?: any;
};

type UseWindowsHookType = ReturnType<typeof useWindowsContext>;

type useWindowsHookType = {
  state: initialStateType;
  setRememberSelect: (rememberSelect: {
    selected: boolean;
    selectedType: string;
  }) => void;
  toggleChangeCollection:()=>void;
  setMaximize: (maximize: boolean) => void;
};

export {
  initialStateType,
  ReducerActionType,
  WINDOWS_ACTIONS_TYPES,
  useWindowsHookType,
  UseWindowsHookType,
};
