import { useEffect, useState } from 'react';
import type { Task } from '../types';
import { getTasks } from '../services/api';

interface ParsedTask extends Task {
  testCases?: { args: unknown[]; expected: unknown; label?: string }[];
  defaultCode?: string;
  functionName?: string;
}

/**
 * Loads sandbox challenges from the backend.
 * Tasks are stored in English in the database to keep payloads small;
 * UI chrome remains localized via i18n keys.
 */
export function useSandboxTasks(): ParsedTask[] {
  const [tasks, setTasks] = useState<ParsedTask[]>([]);

  useEffect(() => {
    let cancelled = false;
    getTasks()
      .then((list) => {
        if (cancelled) return;
        setTasks(list.map((t) => ({ ...t })));
      })
      .catch(() => {
        if (!cancelled) setTasks([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return tasks;
}
