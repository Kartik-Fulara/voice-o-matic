import { Command } from "@tauri-apps/api/shell";
const handleClickToTalk = async ({ audioPath }: { audioPath: string }) => {
  let selectedMicrophone = localStorage.getItem("CABLE_ID") as string;

  const command = Command.sidecar("../bin/click-to-talk.exe", [
    selectedMicrophone.toString(),
    audioPath,
  ]);
  const output = await command.execute();
  console.log("output", output);
};

export default handleClickToTalk;
