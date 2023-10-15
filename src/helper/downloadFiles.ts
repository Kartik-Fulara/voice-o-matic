import { download } from "tauri-plugin-upload-api";

const downloadFiles = (data: any) => {
  let BASE_PATH = localStorage.getItem("BASE_DIR")?.toString();
  download(data.url, BASE_PATH as string, (progress, total) => {
    data.updateDownloadingAudio({
      url: data.url,
      progress: `${progress}`,
      total: `${total}`,
    });
  });
};

export default downloadFiles;
