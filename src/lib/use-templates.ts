"use client";

/**
 * Client-side template loading with an in-memory cache.
 * Content modules are lazy-loaded per subject to keep the initial bundle small.
 */

import { useEffect, useState } from "react";
import type { ProblemTemplate, Subject } from "./types";
import { getSubjectTemplates, getAllTemplates } from "@/content";

let cache: Partial<Record<"math" | "physics" | "all", ProblemTemplate[]>> = {};
let pending: Partial<Record<"math" | "physics" | "all", Promise<ProblemTemplate[]>>> = {};

async function load(key: "math" | "physics" | "all"): Promise<ProblemTemplate[]> {
  if (cache[key]) return cache[key]!;
  if (!pending[key]) {
    pending[key] = key === "all" ? getAllTemplates() : getSubjectTemplates(key as Subject);
  }
  const result = await pending[key]!;
  cache[key] = result;
  return result;
}

export function useSubjectTemplates(subject: Subject): { templates: ProblemTemplate[]; loading: boolean } {
  const [templates, setTemplates] = useState<ProblemTemplate[]>(() => cache[subject] ?? []);
  const [loading, setLoading] = useState(() => !cache[subject]);

  useEffect(() => {
    let alive = true;
    load(subject).then((t) => {
      if (alive) {
        setTemplates(t);
        setLoading(false);
      }
    });
    return () => {
      alive = false;
    };
  }, [subject]);

  return { templates, loading };
}

export function useAllTemplates(): { templates: ProblemTemplate[]; loading: boolean } {
  const [templates, setTemplates] = useState<ProblemTemplate[]>(() => cache.all ?? []);
  const [loading, setLoading] = useState(() => !cache.all);

  useEffect(() => {
    let alive = true;
    load("all").then((t) => {
      if (alive) {
        setTemplates(t);
        setLoading(false);
      }
    });
    return () => {
      alive = false;
    };
  }, []);

  return { templates, loading };
}
