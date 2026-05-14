import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import tasksBase from '../pages/Sandbox/SandboxTasksBase.json';

interface Example {
  input: string;
  output: string;
  explanation?: string;
}

interface TestCase {
  args: unknown[];
  expected: unknown;
  label: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  category: string;
  tags: string[];
  companyName?: string;
  position?: string;
  examples: Example[];
  constraints: string[];
  solvedCount: number;
  functionName: string;
  defaultCode: string;
  testCases: TestCase[];
}

export function useSandboxTasks(): Task[] {
  const { t } = useTranslation();

  return useMemo(() => {
    return tasksBase.tasks.map((baseTask) => {
      const taskTranslation = t(`sandbox.tasks.${baseTask.id}`, { returnObjects: true }) as {
        title: string;
        description: string;
        category: string;
        defaultCode: string;
        examples: Example[];
        constraints: string[];
      };

      return {
        ...baseTask,
        title: taskTranslation.title,
        description: taskTranslation.description,
        category: taskTranslation.category,
        defaultCode: taskTranslation.defaultCode,
        examples: taskTranslation.examples,
        constraints: taskTranslation.constraints,
      } as Task;
    });
  }, [t]);
}
