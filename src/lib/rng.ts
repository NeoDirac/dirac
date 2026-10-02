/**
 * Deterministic seeded RNG (mulberry32).
 *
 * Every parameterized problem template receives one of these. Given the same
 * seed, `generate()` always produces the same numbers, which makes problems
 * reproducible and deep-linkable.
 */

export class Rng {
  private s: number;

  constructor(seed: number) {
    this.s = seed >>> 0;
    if (this.s === 0) this.s = 0x9e3779b9;
  }

  /** uniform float in [0, 1) */
  next(): number {
    this.s = (this.s + 0x6d2b79f5) >>> 0;
    let t = this.s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  /** uniform integer in [min, max] inclusive */
  int(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  /** uniform float in [min, max] rounded to `decimals` places */
  float(min: number, max: number, decimals = 1): number {
    const f = Math.pow(10, decimals);
    return Math.round((this.next() * (max - min) + min) * f) / f;
  }

  /** integer in [min, max] excluding 0 (keeps divisions/roots well-defined) */
  nonZeroInt(min: number, max: number): number {
    for (let i = 0; i < 64; i++) {
      const v = this.int(min, max);
      if (v !== 0) return v;
    }
    return min > 0 ? min : max;
  }

  /** integer in [min, max] excluding `excluded` values */
  intExcluding(min: number, max: number, excluded: number[]): number {
    for (let i = 0; i < 128; i++) {
      const v = this.int(min, max);
      if (!excluded.includes(v)) return v;
    }
    const pool: number[] = [];
    for (let v = min; v <= max; v++) if (!excluded.includes(v)) pool.push(v);
    if (pool.length === 0) throw new Error("Rng.intExcluding: empty pool");
    return pool[this.int(0, pool.length - 1)];
  }

  pick<T>(arr: readonly T[]): T {
    return arr[this.int(0, arr.length - 1)];
  }

  sign(): 1 | -1 {
    return this.next() < 0.5 ? -1 : 1;
  }

  bool(): boolean {
    return this.next() < 0.5;
  }

  /** shuffled copy (Fisher–Yates) */
  shuffle<T>(arr: readonly T[]): T[] {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = this.int(0, i);
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}

/** Stable string → 32-bit hash (FNV-1a). Used to derive seeds from ids. */
export function hashString(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}
