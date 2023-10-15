import { Store } from "tauri-plugin-store-api";

export const store = new Store(".config.json");

// if name same so just add the number in id and name
const defaultCollectionItemData = [
  {
    id: "I_Am_Sorry",
    name: "I Am Sorry",
    audioUrl: "",
    downloadUrl:
      "https://res.cloudinary.com/duv59yta1/video/upload/f_auto:video,q_auto/IAmSorry",
    isOnline: true,
    isDownloading: false,
    isLocal: false,
  },
  {
    id: "Let's_Go",
    name: "Let's Go",
    audioUrl: "",
    downloadUrl:
      "https://res.cloudinary.com/duv59yta1/video/upload/f_auto:video,q_auto/Let'sGo",
    isOnline: true,
    isDownloading: false,
    isLocal: false,
  },
];

const defaultCollectionData = [
  {
    collectionId: "Default_Collection", // don't change this id
    collectionName: "Default Collection", // don't change this name
    otherCollectionItems: defaultCollectionItemData,
  },
];

export const defaultData = {
  selectedCollectionName: "home",
  selectedCollection: "",
  collections: defaultCollectionData,
};

export const setData = async ({ key, value }: { key: string; value: any }) => {
  // console.log('setData', key, value)
  await store.set(key, value);
};

export const getData = async (key: string) => {
  return await store.get(key);
};

export const saveStore = async () => {
  await store.save();
};

export const setDefaultData = () =>{
  setData({
    key: "collectionData",
    value: defaultData,
  });
}