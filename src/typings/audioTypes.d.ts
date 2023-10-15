import { useAudioContext } from "@features/audioContext";

export type initialStateType = {
  playingAudio: string | null;
  downloadingAudio: Array<{
    name: string;
    url: string;
    progress?: string;
    total?: string;
  }>;
};

export const AUDIO_ACTIONS_TYPES = {
  SET_PLAYING_AUDIO: "SET_PLAYING_AUDIO",
  REMOVE_PLAYING_AUDIO: "REMOVE_PLAYING_AUDIO",
  SET_DOWNLOADING_AUDIO: "SET_DOWNLOADING_AUDIO",
  REMOVE_DOWNLOADING_AUDIO: "REMOVE_DOWNLOADING_AUDIO",
  UPDATE_DOWNLOADING_AUDIO: "UPDATE_DOWNLOADING_AUDIO",
} as const;

export type ReducerActionType = {
  type: keyof typeof AUDIO_ACTIONS_TYPES;
  payload?: any;
};

export type UseAudioHookType = ReturnType<typeof useAudioContext>;

export type useCollectionHookType = {
  state: initialStateType;
  setPlayingAudio: (audioUrl: string) => void;
  removePlayingAudio: () => void;
  setDownloadingAudio: ({
    name,
    url,
    progress,
    total,
  }: {
    name: string;
    url: string;
    progress?: string;
    total?: string;
  }) => void;
  removeDownloadingAudio: (audioUrl: string) => void;
  updateDownloadingAudio: ({
    url,
    progress,
    total,
  }: {
    url: string;
    progress: string;
    total: string;
  }) => void;
};
