import asyncio
import edge_tts
from pydub import AudioSegment
import pyaudio
import io
import sys

TEXT = "Hello World!"
VOICE = "en-GB-SoniaNeural"
OUTPUT_FILE = "test.mp3"

arg1 = sys.argv[1]
OUTPUT_DEVICE = int(sys.argv[1])
# OUTPUT_DEVICE = 10
TEXT = sys.argv[2]
print("Running", OUTPUT_DEVICE, TEXT)   


async def amain() -> None:
    communicate = edge_tts.Communicate(TEXT, VOICE)
    audio_data = b""
    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            audio_data += chunk["data"]

    audio_segment = AudioSegment.from_file(
        io.BytesIO(audio_data), format="mp3")

    audio_data = audio_segment.raw_data

    p = pyaudio.PyAudio()

    stream = p.open(format=p.get_format_from_width(audio_segment.sample_width),
                    channels=audio_segment.channels,
                    rate=audio_segment.frame_rate,
                    output=True, output_device_index=OUTPUT_DEVICE)

    # Play audio
    stream.write(audio_data)

    # Stop and close the stream
    stream.stop_stream()
    stream.close()

    # Terminate PyAudio
    p.terminate()


if __name__ == "__main__":
    loop = asyncio.get_event_loop_policy().get_event_loop()
    try:
        loop.run_until_complete(amain())
    finally:
        loop.close()
    sys.stdout.flush()
