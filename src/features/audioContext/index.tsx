"use client"

import React, { useReducer, useCallback, createContext, ReactElement } from 'react'
import {
  AUDIO_ACTIONS_TYPES,
  initialStateType,
  UseAudioHookType,
} from "@typings/audioTypes.d"

import reducer from "./reducer/audioContextReducer";

const initialState: initialStateType = {
  playingAudio: "",
  downloadingAudio: []
};

const useAudioContext = (initialState: initialStateType) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setPlayingAudio = useCallback((audioUrl: string) => {
    dispatch({
      type: AUDIO_ACTIONS_TYPES.SET_PLAYING_AUDIO,
      payload: audioUrl,
    });
  },
    [dispatch]);

  const removePlayingAudio = useCallback(() => {
    dispatch({
      type: AUDIO_ACTIONS_TYPES.REMOVE_PLAYING_AUDIO,
    });
  },
    [dispatch]);

  const setDownloadingAudio = useCallback(({
    name,
    url,
    progress,
    total
  }: {
    name: string,
    url: string,
    progress?: string,
    total?: string
  }) => {
    dispatch({
      type: AUDIO_ACTIONS_TYPES.SET_DOWNLOADING_AUDIO,
      payload: {
        name,
        url,
        progress,
        total
      },
    });
  },
    [dispatch]);

  const removeDownloadingAudio = useCallback((audioUrl: string) => {
    dispatch({
      type: AUDIO_ACTIONS_TYPES.REMOVE_DOWNLOADING_AUDIO,
      payload: audioUrl,
    });
  },
    [dispatch]);

  const updateDownloadingAudio = useCallback(({
    url,
    progress,
    total,
  }: {
    url: string;
    progress: string;
    total: string;
  }) => {

    dispatch({
      type: AUDIO_ACTIONS_TYPES.UPDATE_DOWNLOADING_AUDIO,
      payload: {
        url,
        progress,
        total,
      }
    })
  }, [dispatch]);

  return {
    state,
    setPlayingAudio,
    removePlayingAudio,
    setDownloadingAudio,
    removeDownloadingAudio,
    updateDownloadingAudio
  };

}

const initCollectionState: UseAudioHookType = {
  state: initialState,
  setPlayingAudio: () => { },
  removePlayingAudio: () => { },
  setDownloadingAudio: () => { },
  removeDownloadingAudio: () => { },
  updateDownloadingAudio: () => { }
}

const AudioContext = createContext<UseAudioHookType>(initCollectionState);

type ChildrenType = {
  children: ReactElement | ReactElement[] | React.ReactNode | undefined
}

const AudioProvider = ({
  children
}: ChildrenType): ReactElement => {
  return (
    <>
      <AudioContext.Provider value={useAudioContext(initialState)}>
        {children}
      </AudioContext.Provider>
    </>
  )
}

export default AudioProvider;

export { AudioContext, useAudioContext, initCollectionState };