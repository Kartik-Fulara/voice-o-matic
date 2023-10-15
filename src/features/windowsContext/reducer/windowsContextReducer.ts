import {
  initialStateType,
  ReducerActionType,
  WINDOWS_ACTIONS_TYPES,
} from "@typings/windowsTypes.d";

const reducer = (
  state: initialStateType,
  action: ReducerActionType
): initialStateType => {
  switch (action.type) {
    case WINDOWS_ACTIONS_TYPES.SET_REMEMBER_SELECT:
      return { ...state, rememberSelect: action.payload };
    case WINDOWS_ACTIONS_TYPES.TOGGLE_CHANGE_COLLECTION:
      return { ...state, changeCollection: !state.changeCollection };
    case WINDOWS_ACTIONS_TYPES.TOGGLE_MAXIMIZE:
      return { ...state, maximize: action.payload };
    default:
      return state;
  }
};

export default reducer;
