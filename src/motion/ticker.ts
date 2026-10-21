const PERIOD = 7200;
const drawers = new Set<(u: number) => void>();
let raf = 0;
let start = 0;

function loop(now: number): void {
  if (document.hidden) {
    raf = 0;
    return;
  }
  const u = ((now - start) % PERIOD) / PERIOD;
  for (const draw of drawers) draw(u);
  raf = requestAnimationFrame(loop);
}

function wake(): void {
  if (document.hidden || raf !== 0 || drawers.size === 0) return;
  if (start === 0) start = performance.now();
  raf = requestAnimationFrame(loop);
}

document.addEventListener("visibilitychange", wake);

export function play(draw: (u: number) => void): () => void {
  drawers.add(draw);
  wake();
  return () => {
    drawers.delete(draw);
    if (drawers.size === 0 && raf !== 0) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };
}
