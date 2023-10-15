import { collectionItemsType } from "./collectionTypes";


export type MediaMenuType = {
  name: string;
  icon: React.ReactNode;
  isDropdown: boolean;
  dropDownItems?: Array<{
    name: string;
    isDropdown?: boolean;
    dropDownItems?: Array<{
      name: string;
    }>;
  }>;
  isOnClick?: boolean;
  isIconChange?: boolean;
  onChangeName?: string;
  onChangeIcon?: React.ReactNode;
  onChangeClickFunction?: () => void;
  onClickFunction?: (val?: string) => void;
  removeWhenPlaying?: boolean;
};

export type MediaMenuPropsType = {
  mediaMenu: Array<MediaMenuType>;
  audioUrl?: string;
  playAudioNow?: string;
  audioTime?: {
    currentTime: string;
    duration: string;
  };
};

export type OtherItemsType = {
  collections: Array<collectionItemsType>;
  addItem: boolean;
  setAddItem: (val: boolean) => void;
  setDeleteItem: (val: boolean) => void;
};

export type AudioWrapperType = {
  playingAudio: string;
  setPlayingAudio: (val: string) => void;
  audioTime: {
    currentTime: string;
    duration: string;
  };
  setAudioTime: (val: { currentTime: string; duration: string }) => void;
  removePlayingAudio: () => void;
};

export type DownloadConfigType = {
  downloadFileUrl: string;
  savePath: string;
  onProgress?: (received_bytes: number, total_bytes: number) => void;
  togglePause?: (callback: (isPause: boolean) => void) => void;
  complete?: () => void;
}
