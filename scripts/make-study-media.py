"""
Generate the starter study-music tracks in public/study-media/.

Everything here is synthesised from scratch (noise and sine waves), so the files
carry no third-party rights. Run once; add your own licensed videos next to them
and list them in src/study/catalog.ts.

    python3 scripts/make-study-media.py
"""
import os
import subprocess
import tempfile
import wave

import numpy as np

RATE = 22050
SECONDS = 90
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "study-media")
rng = np.random.default_rng(20261109)


def fade(signal: np.ndarray, seconds: float = 1.5) -> np.ndarray:
    n = int(seconds * RATE)
    ramp = np.linspace(0.0, 1.0, n)
    signal[:n] *= ramp
    signal[-n:] *= ramp[::-1]
    return signal


def normalise(signal: np.ndarray, peak: float = 0.6) -> np.ndarray:
    return signal / (np.max(np.abs(signal)) + 1e-9) * peak


def lowpass(signal: np.ndarray, alpha: float) -> np.ndarray:
    out = np.empty_like(signal)
    acc = 0.0
    for i, x in enumerate(signal):
        acc += alpha * (x - acc)
        out[i] = acc
    return out


def brown() -> np.ndarray:
    white = rng.standard_normal(RATE * SECONDS)
    walk = np.cumsum(white)
    walk -= lowpass(walk, 0.0005)  # remove drift so it does not wander off
    return normalise(walk, 0.5)


def rain() -> np.ndarray:
    n = RATE * SECONDS
    hiss = rng.standard_normal(n)
    hiss = hiss - lowpass(hiss, 0.15)  # keep the bright part
    hiss = lowpass(hiss, 0.6) * 0.35
    drops = np.zeros(n)
    for start in rng.integers(0, n - 400, size=SECONDS * 25):
        length = int(rng.integers(80, 300))
        decay = np.exp(-np.linspace(0, 6, length))
        drops[start:start + length] += rng.standard_normal(length) * decay * rng.uniform(0.1, 0.5)
    return normalise(hiss + lowpass(drops, 0.5), 0.5)


def waves() -> np.ndarray:
    base = brown()
    t = np.arange(len(base)) / RATE
    swell = 0.55 + 0.45 * np.sin(2 * np.pi * t / 9.0) ** 2  # one wave about every 9 s
    return normalise(base * swell, 0.5)


NOTE = {"C3": 130.81, "E3": 164.81, "G3": 196.0, "A2": 110.0, "A3": 220.0, "C4": 261.63, "E4": 329.63,
        "G4": 392.0, "B3": 246.94, "D4": 293.66, "F3": 174.61, "F4": 349.23, "D3": 146.83}


def pad(chords: list[list[str]], seconds_per_chord: float) -> np.ndarray:
    n = RATE * SECONDS
    t = np.arange(n) / RATE
    out = np.zeros(n)
    per = int(seconds_per_chord * RATE)
    attack = int(2.0 * RATE)
    for index in range(int(np.ceil(n / per))):
        chord = chords[index % len(chords)]
        start = index * per
        end = min(n, start + per + attack)  # overlap into the next chord for a soft change
        span = t[start:end] - t[start]
        env = np.minimum(1.0, span / 2.0) * np.minimum(1.0, (span[-1] - span) / 2.0 + 0.001)
        tone = np.zeros(end - start)
        for name in chord:
            f = NOTE[name]
            for detune in (-0.6, 0.0, 0.6):
                tone += np.sin(2 * np.pi * (f + detune) * span) * 0.6
                tone += np.sin(2 * np.pi * 2 * (f + detune) * span) * 0.12
        tremolo = 1 + 0.05 * np.sin(2 * np.pi * 0.25 * span)
        out[start:end] += tone * env * tremolo
    return normalise(lowpass(out, 0.25), 0.45)


TRACKS = {
    "on-nau": (brown, "0x3b2f2a"),
    "mua": (rain, "0x2f4a5c"),
    "song": (waves, "0x1f5560"),
    "pad-do": (lambda: pad([["C3", "E3", "G3", "C4"], ["C3", "E3", "G3", "E4"]], 10.0), "0x1c6b5e"),
    "pad-la": (lambda: pad([["A2", "E3", "A3", "C4"], ["A2", "E3", "G3", "C4"]], 10.0), "0x4a3b5c"),
    "pad-vong": (lambda: pad([["C3", "E3", "G3"], ["G3", "B3", "D4"], ["A2", "C4", "E4"], ["F3", "A3", "C4"]], 7.5), "0x5c4a2f"),
}


def main() -> None:
    os.makedirs(OUT, exist_ok=True)
    for name, (make, colour) in TRACKS.items():
        signal = fade(make())
        stereo = np.stack([signal, np.roll(signal, 37)], axis=1)  # a touch of width
        pcm = (np.clip(stereo, -1, 1) * 32767).astype(np.int16)
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
            with wave.open(tmp.name, "wb") as handle:
                handle.setnchannels(2)
                handle.setsampwidth(2)
                handle.setframerate(RATE)
                handle.writeframes(pcm.tobytes())
            wav = tmp.name
        target = os.path.join(OUT, f"{name}.mp4")
        subprocess.run([
            "ffmpeg", "-y", "-loglevel", "error",
            "-f", "lavfi", "-i", f"color=c={colour}:s=320x180:r=1",
            "-i", wav, "-shortest",
            "-c:v", "libx264", "-tune", "stillimage", "-pix_fmt", "yuv420p",
            "-c:a", "aac", "-b:a", "48k", "-movflags", "+faststart", target,
        ], check=True)
        webm = os.path.join(OUT, f"{name}.webm")
        subprocess.run([
            "ffmpeg", "-y", "-loglevel", "error",
            "-f", "lavfi", "-i", f"color=c={colour}:s=320x180:r=1",
            "-i", wav, "-shortest",
            "-c:v", "libvpx-vp9", "-b:v", "20k", "-pix_fmt", "yuv420p",
            "-c:a", "libopus", "-b:a", "40k", webm,
        ], check=True)
        os.unlink(wav)
        print(f"{target}: {os.path.getsize(target) // 1024} KB, {webm}: {os.path.getsize(webm) // 1024} KB")


if __name__ == "__main__":
    main()
