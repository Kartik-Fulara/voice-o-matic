import uuid from "@/helper/uuid";
import {
  COLLECTION_ACTIONS_TYPES,
  initialStateType,
  ReducerActionType,
  selectedCollectionType,
} from "@typings/collectionTypes.d";

const reducer = (
  state: initialStateType,
  action: ReducerActionType
): initialStateType => {
  switch (action.type) {
    case COLLECTION_ACTIONS_TYPES.ADD_COLLECTION:
      return {
        ...state,
        collections: state.collections
          ? [...state.collections, action.payload]
          : [action.payload],
      };
    case COLLECTION_ACTIONS_TYPES.REMOVE_COLLECTION:
      return {
        ...state,
        selectedCollectionName: "home",
        selectedCollection: "",
        collections: state.collections?.filter(
          (collection) => collection.collectionId !== action.payload
        ),
      };
    case COLLECTION_ACTIONS_TYPES.SET_SELECTED_COLLECTION:
      return {
        ...state,
        selectedCollectionName: action.payload,
        selectedCollection: state.collections?.filter((value)=>value.collectionName === action.payload)[0].collectionId,
      };
    case COLLECTION_ACTIONS_TYPES.REMOVE_SELECTED_COLLECTION:
      return {
        ...state,
        selectedCollectionName: "home",
        selectedCollection: "",
      };
    case COLLECTION_ACTIONS_TYPES.SET_ALL_DATA:
      return {
        ...state,
        selectedCollection: action.payload.selectedCollection,
        selectedCollectionName: action.payload.selectedCollectionName,
        collections: action.payload.collections,
      };
    case COLLECTION_ACTIONS_TYPES.ADD_COLLECTION_ITEM:
      let collectionData = state.collections?.filter(
        (collection) => collection.collectionId === action.payload.collectionId
      )[0];

      if (
        collectionData &&
        !collectionData?.otherCollectionItems?.includes(
          action.payload.collectionItem
        )
      ) {
        collectionData.otherCollectionItems?.push(
          action.payload.collectionItem
        );
      } else {
        return {
          ...state,
        };
      }

      let finalCollections = state.collections?.map((collection) => {
        if (collection.collectionId === action.payload.collectionId) {
          return collectionData;
        }
        return collection;
      });

      return {
        ...state,
        collections: finalCollections as any
      };
    case COLLECTION_ACTIONS_TYPES.REMOVE_COLLECTION_ITEM:
      state.collections?.forEach((collection) => {
        if (collection.collectionId === action.payload.collectionId) {
          collection.otherCollectionItems =
            collection.otherCollectionItems?.filter(
              (collectionItem) =>
                collectionItem.id !== action.payload.collectionItemId
            );
        }
      });
      return {
        ...state,
      };
    case COLLECTION_ACTIONS_TYPES.CHANGE_TO_QUICK_MENU:
      state.collections?.forEach((collection) => {
        if (collection.collectionId === action.payload.collectionId) {
          collection.isOnQuickMenu = !collection.isOnQuickMenu;
        }
      });
      return {
        ...state,
      };
    case COLLECTION_ACTIONS_TYPES.CHANGE_COLLECTION_NAME:
      state.selectedCollectionName = action.payload.newName;
      state.collections?.forEach((collection) => {
        if (collection.collectionId === action.payload.collectionId) {
          collection.collectionName = action.payload.newName;
        }
        collection.collectionId = action.payload.newName + "-" + uuid();
      });
      return {
        ...state,
      };
    case COLLECTION_ACTIONS_TYPES.TOGGLE_DOWNLOADING:
      state.collections?.forEach((collection) => {
        if (collection.collectionId === action.payload.collectionId) {
          collection.otherCollectionItems?.forEach((collectionItem) => {
            if (collectionItem.id === action.payload.collectionItemId) {
              collectionItem.isDownloading = !collectionItem.isDownloading;
            }
          });
        }
      });
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
