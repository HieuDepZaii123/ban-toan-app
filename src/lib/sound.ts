/** Tiny Web Audio beeps for answer feedback. Silent if audio is blocked. */

let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  if (typeof window === "undefined" || typeof AudioContext === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as any).webkitAudioContext;
    if (!Ctor) return null;
    try { ctx = new Ctor(); } catch { return null; }
  }
  return ctx;
}

function beep(freq: number, ms: number, type: OscillatorType = "sine"): void {
  const context = audio();
  if (!ctx) return;
  const t = context.currentTime;
  const osc = context.createOscillator();
  const gain = context.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.5, t + ms / 1000);
  gain.gain.setValueAtTime(0.1, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + ms / 1000);
  osc.connect(gain);
  gain.connect(context.destination);
  osc.start(t);
  osc.stop(t + ms / 1000);
}

/** Play a rising two-note chirp when an answer is correct. */
export function soundCorrect(): void {
  beep(880, 120);
  setTimeout(() => beep(1320, 160), 130);
}

/** Play a single low buzz when an answer is wrong. */
export function soundWrong(): void {
  beep(220, 260);
}
