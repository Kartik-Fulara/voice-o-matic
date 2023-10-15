import { UseAudioHookType } from "@typings/audioTypes.d";
import { useContext } from "react";
import { AudioContext } from "@features/audioContext";

export const useAudioContext = (): UseAudioHookType => {
  const context = useContext(AudioContext);

  if (!context) {
    throw new Error(
      "useAudioContext hook must be used within AudioContextProvider"
    );
  }

  const {
    state: { playingAudio, downloadingAudio },
    setPlayingAudio,
    removePlayingAudio,
    updateDownloadingAudio,
    removeDownloadingAudio,
    setDownloadingAudio,
  } = context;

  return {
    state: { playingAudio, downloadingAudio },
    setPlayingAudio,
    removePlayingAudio,
    updateDownloadingAudio,
    removeDownloadingAudio,
    setDownloadingAudio,
  };
};
