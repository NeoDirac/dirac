"use client";

/**
 * Hash-based router for the single-route SPA.
 *
 * Routes:
 *   #/                                   home
 *   #/math  #/physics                     subject overview
 *   #/math/<topicId>                      topic detail + practice setup
 *   #/practice                            mixed practice setup
 *   #/session?...                         running practice session
 *   #/progress  #/about
 *
 * Session query params:
 *   m = topic|mixed|challenge   s = math|physics|all (comma list ok)
 *   t = topicId                 d = easy|medium|hard|challenge|any
 *   n = 5|10|20|inf             k = session seed
 */

import { useEffect, useState, useCallback } from "react";
import type { Difficulty, SessionConfig, SessionMode, Subject } from "./types";

export type Route =
  | { name: "home" }
  | { name: "subject"; subject: Subject }
  | { name: "topic"; subject: Subject; topicId: string }
  | { name: "practice" }
  | { name: "session"; config: SessionConfig }
  | { name: "progress" }
  | { name: "about" };

export function parseHash(rawHash: string): Route {
  const hash = rawHash.replace(/^#/, "");
  const [pathPart, queryPart] = hash.split("?");
  const query = new URLSearchParams(queryPart ?? "");
  const segments = pathPart.split("/").filter(Boolean);

  if (segments.length === 0) return { name: "home" };

  if (segments[0] === "math" || segments[0] === "physics") {
    const subject: Subject = segments[0];
    if (segments.length === 1) return { name: "subject", subject };
    return { name: "topic", subject, topicId: segments[1] };
  }

  if (segments[0] === "practice") return { name: "practice" };
  if (segments[0] === "progress") return { name: "progress" };
  if (segments[0] === "about") return { name: "about" };

  if (segments[0] === "session") {
    return { name: "session", config: parseSessionConfig(query) };
  }

  return { name: "home" };
}

function parseSessionConfig(q: URLSearchParams): SessionConfig {
  const mRaw = q.get("m");
  const mode: SessionMode = mRaw === "mixed" || mRaw === "challenge" ? mRaw : "topic";
  const subjectsRaw = q.get("s") ?? "math";
  const subjects: Subject[] =
    subjectsRaw === "all"
      ? ["math", "physics"]
      : (subjectsRaw.split(",") as Subject[]).filter((s) => s === "math" || s === "physics");
  const dRaw = q.get("d");
  const difficulty: Difficulty | "any" =
    dRaw === "easy" || dRaw === "medium" || dRaw === "hard" || dRaw === "challenge" ? dRaw : "any";
  const nRaw = q.get("n");
  const count = nRaw === "inf" ? Infinity : Math.min(Math.max(parseInt(nRaw ?? "10", 10) || 10, 1), 40);
  const topicId = q.get("t") ?? undefined;
  const seed = parseInt(q.get("k") ?? "0", 10) || 0;
  const easyWeighted = q.get("w") === "easy";
  return { mode, subjects: subjects.length ? subjects : ["math"], topicId, difficulty, count, seed, easyWeighted };
}

export function sessionHref(config: SessionConfig): string {
  const q = new URLSearchParams();
  q.set("m", config.mode);
  q.set("s", config.subjects.join(","));
  if (config.topicId) q.set("t", config.topicId);
  q.set("d", config.difficulty);
  q.set("n", Number.isFinite(config.count) ? String(config.count) : "inf");
  q.set("k", String(config.seed));
  if (config.easyWeighted) q.set("w", "easy");
  return `#/session?${q.toString()}`;
}

export function href(
  route:
    | { name: "home" }
    | { name: "subject"; subject: Subject }
    | { name: "topic"; subject: Subject; topicId: string }
    | { name: "practice" }
    | { name: "progress" }
    | { name: "about" },
): string {
  switch (route.name) {
    case "home":
      return "#/";
    case "subject":
      return `#/${route.subject}`;
    case "topic":
      return `#/${route.subject}/${route.topicId}`;
    default:
      return `#/${route.name}`;
  }
}

export function useRoute(): Route {
  // starts at `home` so SSR and the hydration pass agree, then syncs with
  // the actual hash right after mount and on every hashchange
  const [route, setRoute] = useState<Route>({ name: "home" });

  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash(window.location.hash));
      window.scrollTo({ top: 0 });
    };
    const id = requestAnimationFrame(onChange);
    window.addEventListener("hashchange", onChange);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("hashchange", onChange);
    };
  }, []);

  return route;
}

/** programmatic navigation */
export function navigate(to: string): void {
  if (typeof window === "undefined") return;
  window.location.hash = to.startsWith("#") ? to.slice(1) : to;
}

/** returns a stable callback that navigates on click */
export function useNavigate() {
  return useCallback((to: string) => navigate(to), []);
}
