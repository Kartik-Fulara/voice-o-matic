import { useCollectionHookType } from "@typings/collectionTypes.d";
import { useContext } from "react";
import { CollectionContext } from "@features/collectionsContext/context";

export const useCollectionContext = (): useCollectionHookType => {
  const context = useContext(CollectionContext);

  if (!context) {
    throw new Error(
      "useCollectionContext hook must be used within CollectionContextProvider"
    );
  }

  const {
    state: { collections, selectedCollection, selectedCollectionName },
    setAllData,
    removeSelectedCollection,
    setSelectedCollection,
    removeCollection,
    addCollection,
    setCollectionItems,
    setCollectionQuickMenu,
    removeCollectionItem,
    changeCollectionName,
    toggleDownloading,
  } = context;

  return {
    state: { collections, selectedCollection, selectedCollectionName },
    setAllData,
    removeSelectedCollection,
    setSelectedCollection,
    removeCollection,
    addCollection,
    setCollectionItems,
    setCollectionQuickMenu,
    removeCollectionItem,
    changeCollectionName,
    toggleDownloading,
  };
};
