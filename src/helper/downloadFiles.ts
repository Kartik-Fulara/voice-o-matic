import { download } from "tauri-plugin-upload-api";
import { useAudioContext } from "@hooks/audioContextHook";

const { updateDownloadingAudio } = useAudioContext();
const downloadFiles = (data: any) => {
  let BASE_PATH = localStorage.getItem("BASE_DIR")?.toString();
  download(data.url, BASE_PATH as string, (progress, total) => {
    updateDownloadingAudio({
      url: data.url,
      progress: `${progress}`,
      total: `${total}`,
    });
  });
};

export default downloadFiles;
