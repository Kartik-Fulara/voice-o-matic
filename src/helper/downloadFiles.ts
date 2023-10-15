import { download } from "tauri-plugin-upload-api";
import { appLocalDataDir, appDataDir } from "@tauri-apps/api/path";
import { useAudioContext } from "@/hooks/audioContextHook";

const downloadFiles = async (data: any) => {
  const { updateDownloadingAudio } = useAudioContext();
  const appLocalDataDirPath = await appDataDir();
  // console.log(appLocalDataDirPath);
  // console.log(await appDataDir());

  // let BASE_PATH = localStorage.getItem("BASE_DIR")?.toString();
  let BASE_PATH = `${appLocalDataDirPath}audios`;
  console.log(BASE_PATH);
  console.log(data);
  

  download(data.url, BASE_PATH as string, (progress, total) => {
    updateDownloadingAudio({
      url: data.url,
      progress: `${progress}`,
      total: `${total}`,
    });
  });
};

export default downloadFiles;
