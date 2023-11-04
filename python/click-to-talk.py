import pyaudio
import wave
import sys
import os
import asyncio
from pydub import AudioSegment


OUTPUT_FILE = "audioFile.mp3"
# arg1 = sys.argv[1]
OUTPUT_DEVICE = int(sys.argv[1])
# OUTPUT_DEVICE = 8

# select path from system and save it to AUDIO_PATH
AUDIO_PATH = sys.argv[2]
# AUDIO_PATH = "Your Song Path"


async def amain() -> None:
    # Convert to WAV using the specified FFMPEG path
    if os.path.exists(OUTPUT_FILE):
        os.remove(OUTPUT_FILE)
    sound = AudioSegment.from_file(AUDIO_PATH)

    sound.export(OUTPUT_FILE, format="wav")

    # Read the WAV file
    wf = wave.open(OUTPUT_FILE, "rb")

    # Initialize PyAudio
    p = pyaudio.PyAudio()

    # Open stream
    stream = p.open(
        format=p.get_format_from_width(wf.getsampwidth()),
        channels=wf.getnchannels(),
        rate=wf.getframerate(),
        output=True,
        output_device_index=OUTPUT_DEVICE
    )

    # Get the frame size
    frame_size = wf.getframerate()  # Set the frame size to the audio file's frame rate

    # Play audio
    data = wf.readframes(frame_size)
    while len(data) > 0:
        stream.write(data)
        data = wf.readframes(frame_size)
        print("Playing....")
        sys.stdout.flush()

    # Stop stream
    stream.stop_stream()
    stream.close()

    print("Completed!!!")
    sys.stdout.flush()

    # Terminate PyAudio
    p.terminate()

    # Close the WAV file
    wf.close()

    # Remove the temporary WAV file
    os.remove(OUTPUT_FILE)

if __name__ == "__main__":
    loop = asyncio.get_event_loop_policy().get_event_loop()
    try:
        print("Started...")
        sys.stdout.flush()
        loop.run_until_complete(amain())
    finally:
        loop.close()
    sys.stdout.flush()
