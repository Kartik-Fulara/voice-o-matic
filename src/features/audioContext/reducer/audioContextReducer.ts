import {
  AUDIO_ACTIONS_TYPES,
  initialStateType,
  ReducerActionType,
} from "@typings/audioTypes.d";

const reducer = (
  state: initialStateType,
  action: ReducerActionType
): initialStateType => {
  switch (action.type) {
    case AUDIO_ACTIONS_TYPES.SET_PLAYING_AUDIO:
      return { ...state, playingAudio: action.payload };
    case AUDIO_ACTIONS_TYPES.REMOVE_PLAYING_AUDIO:
      return { ...state, playingAudio: "" };
    case AUDIO_ACTIONS_TYPES.SET_DOWNLOADING_AUDIO:
      return {
        ...state,
        downloadingAudio: [...state.downloadingAudio, action.payload],
      };
    case AUDIO_ACTIONS_TYPES.REMOVE_DOWNLOADING_AUDIO:
      return {
        ...state,
        downloadingAudio: state.downloadingAudio.filter(
          (item) => item !== action.payload
        ),
      };
    case AUDIO_ACTIONS_TYPES.UPDATE_DOWNLOADING_AUDIO:
      let downloadItem = state.downloadingAudio.filter(
        (download) => download.url === action.payload.url
      )[0];
      let otherDownloadItem = state.downloadingAudio.filter(
        (download) => download.url !== action.payload.url
      );
      downloadItem.progress = action.payload.progress;
      downloadItem.total = action.payload.total;
      return {
        ...state,
        downloadingAudio: [...otherDownloadItem, downloadItem],
      };
    default:
      return state;
  }
};

export default reducer;
