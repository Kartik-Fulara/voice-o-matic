"use client"

import React, { useReducer, useCallback, createContext, ReactElement } from "react";
import reducer from "./reducer/collectionContextReducer";
import {
  initialStateType,
  COLLECTION_ACTIONS_TYPES,
  selectedCollectionType,
  UseCollectionContextType,
  collectionItemsType
} from "@typings/collectionTypes.d";

const initialState: initialStateType = {
  selectedCollectionName: "home",
  selectedCollection: "",
  collections: [],
};

const useCollectionContext = (initialState: initialStateType) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const setAllData = useCallback((data: initialStateType) => {
    // console.log("data", data)
    dispatch({
      type: COLLECTION_ACTIONS_TYPES.SET_ALL_DATA,
      payload: data,
    });
  },
    [dispatch]
  );

  const addCollection = useCallback(
    (collection: selectedCollectionType) => {
      // console.log("collection", collection)
      dispatch({
        type: COLLECTION_ACTIONS_TYPES.ADD_COLLECTION,
        payload: collection,
      });
    },
    [dispatch]
  );

  const removeCollection = useCallback(
    (collectionId: string) => {
      dispatch({
        type: COLLECTION_ACTIONS_TYPES.REMOVE_COLLECTION,
        payload: collectionId,
      });
    },
    [dispatch]
  );

  const setSelectedCollection = useCallback(
    (collectionName: string) => {
      dispatch({
        type: COLLECTION_ACTIONS_TYPES.SET_SELECTED_COLLECTION,
        payload: collectionName,
      });
    },
    [dispatch]
  );

  const removeSelectedCollection = useCallback(
    () => {
      dispatch({ type: COLLECTION_ACTIONS_TYPES.REMOVE_SELECTED_COLLECTION });
    }, [dispatch]
  );

  const setCollectionItems = useCallback(
    ({ collectionId, collectionItem }: {
      collectionId: string,
      collectionItem: collectionItemsType
    }) => {
      dispatch({
        type: COLLECTION_ACTIONS_TYPES.ADD_COLLECTION_ITEM,
        payload: {
          collectionId,
          collectionItem
        }
      })
    }, [dispatch]
  )

  const removeCollectionItem = useCallback(
    ({ collectionId, collectionItemId }: {
      collectionId: string,
      collectionItemId: string
    }) => {
      dispatch({
        type: COLLECTION_ACTIONS_TYPES.REMOVE_COLLECTION_ITEM,
        payload: {
          collectionId,
          collectionItemId
        }
      })
    }, [dispatch]
  )

  const setCollectionQuickMenu = useCallback(
    (collectionId: string) => {
      dispatch({
        type: COLLECTION_ACTIONS_TYPES.CHANGE_TO_QUICK_MENU,
        payload: collectionId
      })
    }, [dispatch]
  )

  const changeCollectionName = useCallback((collectionId: string, newName: string) => {
    dispatch({
      type: COLLECTION_ACTIONS_TYPES.CHANGE_COLLECTION_NAME,
      payload: {
        collectionId,
        newName
      }
    })
  }, [dispatch])

  const toggleDownloading = useCallback(({ collectionItemId, collectionId }: {
    collectionItemId: string,
    collectionId: string
  }) => {
    dispatch({
      type: COLLECTION_ACTIONS_TYPES.TOGGLE_DOWNLOADING,
      payload: { collectionItemId, collectionId }
    })
  }, [dispatch])

  return {
    state,
    addCollection,
    removeCollection,
    setSelectedCollection,
    removeSelectedCollection,
    setAllData,
    setCollectionItems,
    removeCollectionItem,
    setCollectionQuickMenu,
    changeCollectionName,
    toggleDownloading
  };
};

const initCollectionState: UseCollectionContextType = {
  state: initialState,
  addCollection: () => { },
  removeCollection: () => { },
  setSelectedCollection: () => { },
  removeSelectedCollection: () => { },
  setAllData: () => { },
  changeCollectionName: () => { },
  toggleDownloading: () => { },
};

const CollectionContext = createContext<UseCollectionContextType>(initCollectionState);

type ChildrenType = {
  children: ReactElement | ReactElement[] | React.ReactNode | undefined
}

const CollectionProvider = ({
  children
}: ChildrenType): ReactElement => {
  return (
    <>
      <CollectionContext.Provider value={useCollectionContext(initialState)}>
        {children}
      </CollectionContext.Provider>
    </>
  )
}

export default CollectionProvider;

export { useCollectionContext, initCollectionState, initialState, CollectionContext };

