/** Fisher–Yates. `random` returns a number in [0, 1). */
export function shuffleOrder(length: number, random: () => number = Math.random): number[] {
  const order = Array.from({ length }, (_, index) => index);
  for (let i = length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    const left = order[i];
    const right = order[j];
    if (left === undefined || right === undefined) continue;
    order[i] = right;
    order[j] = left;
  }
  return order;
}

/** Position, in the shuffled list, of the choice that was correct before the shuffle. */
export function remapAnswer(order: readonly number[], answer: number): number {
  const at = order.indexOf(answer);
  return at >= 0 ? at : 0;
}
