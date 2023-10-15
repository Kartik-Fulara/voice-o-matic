import { useCollectionContext } from "@/components/context/collectionsContext/context";

export type collectionItemsType = {
  id: string;
  name: string;
  image?: string;
  audioUrl?: string;
  downloadUrl?: string;
  onAutoDetection?: boolean;
  onQuickMenu?: boolean;
  isOnline?: boolean;
  isDownloading?: boolean;
  isLocal?: boolean;
};

export type selectedCollectionType = {
  collectionId: string;
  collectionName: string;
  isOnQuickMenu?: boolean;
  isOnAutoDetection?: boolean;
  otherCollectionItems?: Array<collectionItemsType>;
  detectionCollection?: collectionItemsType | null;
  quickMenuCollection?: collectionItemsType | null;
};

export type initialStateType = {
  selectedCollectionName?: string;
  selectedCollection?: string;
  collections?: Array<selectedCollectionType>;
};

const COLLECTION_ACTIONS_TYPES = {
  SET_ALL_DATA: "SET_ALL_DATA",

  REMOVE_COLLECTION: "REMOVE_COLLECTION",
  ADD_COLLECTION: "ADD_COLLECTION",

  ADD_COLLECTION_ITEM: "ADD_COLLECTION_ITEM",
  REMOVE_COLLECTION_ITEM: "REMOVE_COLLECTION_ITEM",

  CHANGE_TO_QUICK_MENU: "CHANGE_TO_QUICK_MENU",

  SET_SELECTED_COLLECTION: "SET_SELECTED_COLLECTION",
  REMOVE_SELECTED_COLLECTION: "REMOVE_SELECTED_COLLECTION",

  CHANGE_COLLECTION_NAME: "CHANGE_COLLECTION_NAME",

  TOGGLE_DOWNLOADING: "TOGGLE_DOWNLOADING",
} as const;

export type ReducerActionType = {
  type: keyof typeof COLLECTION_ACTIONS_TYPES;
  payload?: any;
};

export type UseCollectionContextType = ReturnType<typeof useCollectionContext>;

export type useCollectionHookType = {
  state: initialStateType;
  addCollection: (collectionData: selectedCollectionType) => void;
  removeCollection: (collectionId: string) => void;
  setSelectedCollection: (collectionName: string) => void;
  removeSelectedCollection: () => void;
  setAllData: (data: initialStateType) => void;
  setCollectionItems: ({
    collectionId,
    collectionItem,
  }: {
    collectionId: string;
    collectionItem: collectionItemsType;
  }) => void;
  setCollectionQuickMenu: (collectionId: string) => void;
  removeCollectionItem: ({
    collectionId,
    collectionItemId,
  }: {
    collectionId: string;
    collectionItemId: string;
  }) => void;
  changeCollectionName: (collectionId: string, newName: string) => void;
  toggleDownloading: ({
    collectionItemId,
    collectionId,
  }: {
    collectionItemId: string;
    collectionId: string;
  }) => void;
};

export { COLLECTION_ACTIONS_TYPES };
