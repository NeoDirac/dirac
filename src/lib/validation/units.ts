/**
 * Unit validation.
 *
 * Units are normalized (lowercase, spacing removed, unicode superscripts and
 * middots unified) and compared against the author-declared accepted list.
 * Authors should list every plausible accepted spelling explicitly.
 */

const SUPERS: Record<string, string> = {
  "⁰": "^0", "¹": "^1", "²": "^2", "³": "^3", "⁴": "^4",
  "⁵": "^5", "⁶": "^6", "⁷": "^7", "⁸": "^8", "⁹": "^9",
};

export function normalizeUnit(u: string): string {
  let s = u.trim().toLowerCase();
  s = s.replace(/\s+/g, "");
  s = s.replace(/[·⋅∙]/g, "");
  s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (c) => SUPERS[c]);
  // "m/s2" → "m/s^2"  (digit right after a letter or '/' at the end)
  s = s.replace(/([a-z])(\d)$/g, "$1^$2");
  s = s.replace(/([a-z])(\d)(?=[/^]|$)/g, "$1^$2");
  // ohm symbols
  s = s.replace(/[ωΩ]/g, "ohm");
  // degree aliases
  s = s.replace(/^°$|^deg$|^degrees$|^grados$/, "deg");
  return s;
}

export function checkUnit(input: string, accepted: readonly string[]): boolean {
  const n = normalizeUnit(input);
  if (!n) return false;
  return accepted.some((a) => normalizeUnit(a) === n);
}
