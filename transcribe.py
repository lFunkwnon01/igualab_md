from faster_whisper import WhisperModel

model = WhisperModel("base", device="cpu", compute_type="int8")
segments, info = model.transcribe("kickoff_audio.wav", language="es", beam_size=5)

with open("transcript.txt", "w", encoding="utf-8") as f:
    for seg in segments:
        line = f"[{seg.start:.1f}-{seg.end:.1f}] {seg.text}\n"
        f.write(line)
        f.flush()

print("TRANSCRIPCION_COMPLETA")
