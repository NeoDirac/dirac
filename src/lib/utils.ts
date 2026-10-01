import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Compact duration for UI: 42 s · 5 min · 1 h 12 min · 2m 30s */
export function formatDuration(totalSec: number, opts?: { compact?: boolean }): string {
  const s = Math.max(0, Math.round(totalSec));
  if (s < 5) return opts?.compact ? "0s" : "0 s";
  if (s < 60) return opts?.compact ? `${s}s` : `${s} s`;
  const m = Math.floor(s / 60);
  const rest = s % 60;
  if (m < 60) {
    if (rest === 0) return `${m} min`;
    return opts?.compact ? `${m}m ${rest}s` : `${m} min ${rest} s`;
  }
  const h = Math.floor(m / 60);
  const mr = m % 60;
  if (mr === 0) return `${h} h`;
  return opts?.compact ? `${h}h ${mr}m` : `${h} h ${mr} min`;
}

/** Zero-padded mm:ss for a live timer display. */
export function formatClock(totalSec: number): string {
  const s = Math.max(0, Math.floor(totalSec));
  const m = Math.floor(s / 60);
  const ss = s % 60;
  return `${m}:${String(ss).padStart(2, "0")}`;
}

/** Copy text to the clipboard with a legacy execCommand fallback.
 *  Returns true on success — callers decide which toast to show. */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        /* fall through to the legacy path */
      }
    }
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}
