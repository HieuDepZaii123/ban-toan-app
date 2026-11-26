/**
 * Phép quay cho hình không gian xoay được. Quy ước tọa độ của hình: x sang phải, y lùi vào trong, z lên trên.
 * Quay quanh trục z một góc yaw, rồi nghiêng quanh trục x một góc pitch; màn hình lấy (x, z), độ sâu lấy y.
 */
export type V3 = [number, number, number];

export function rotate(p: V3, yaw: number, pitch: number): V3 {
  const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
  const x1 = p[0] * cy - p[1] * sy;
  const y1 = p[0] * sy + p[1] * cy;
  const z1 = p[2];
  return [x1, y1 * cp - z1 * sp, y1 * sp + z1 * cp];
}

export const clampPitch = (pitch: number): number => Math.max(-1.45, Math.min(1.45, pitch));

/** Góc nhìn ban đầu gần giống hình chiếu xiên mặc định. */
export const START_VIEW = { yaw: -0.5, pitch: 0.45 };

/**
 * Góc nhìn ban đầu cho một hình: gần góc mặc định, nhưng tránh nhìn đúng cạnh các mặt phẳng.
 * `normals` là các vectơ pháp tuyến của các mặt phẳng được tô trong hình.
 */
export function startViewFor(normals: V3[]): { yaw: number; pitch: number } {
  const unit = normals.map((n) => {
    const l = Math.hypot(n[0], n[1], n[2]) || 1;
    return [n[0] / l, n[1] / l, n[2] / l] as V3;
  });
  let best = { yaw: START_VIEW.yaw, pitch: START_VIEW.pitch, score: -Infinity };
  for (let yaw = -1.3; yaw <= 0.3; yaw += 0.05) {
    for (let pitch = 0.25; pitch <= 0.95; pitch += 0.05) {
      const edgeOn = unit.length ? Math.min(...unit.map((n) => Math.abs(rotate(n, yaw, pitch)[1]))) : 1;
      // Nhìn càng ít cạnh càng tốt, tối đa 0,35 là đủ; sau đó ưu tiên gần góc mặc định.
      const score = Math.min(edgeOn, 0.35) * 4 - (Math.abs(yaw - START_VIEW.yaw) + Math.abs(pitch - START_VIEW.pitch));
      if (score > best.score) best = { yaw, pitch, score };
    }
  }
  return { yaw: best.yaw, pitch: best.pitch };
}
