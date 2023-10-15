import { Command } from "@tauri-apps/api/shell";
const handleTTS = async ({ text }: { text: string }) => {
  let selectedMicrophone = localStorage.getItem("CABLE_ID") as string;

  const command = Command.sidecar("../bin/text-to-speech", [
    selectedMicrophone.toString(),
    text,
  ]);
  const output = await command.execute();
  // console.log("output", output);
};

export default handleTTS;
