import { useState, useEffect } from 'react';

type MockFileName = 'HomeMockData.json' | 'JobsMockData.json' | 'SandboxMockData.json' | 'CompanyOverviewMockData.json' | 'CompaniesMockData.json';

const cache: Record<string, any> = {};

// Map filenames to their actual locations in the project
const fileLocations: Record<MockFileName, string> = {
  'HomeMockData.json': '../pages/Home/HomeMockData.json',
  'JobsMockData.json': '../pages/Jobs/JobsMockData.json',
  'SandboxMockData.json': '../pages/Sandbox/SandboxMockData.json',
  'CompaniesMockData.json': '../pages/Companies/CompaniesMockData.json',
  'CompanyOverviewMockData.json': '../pages/CompanyOverview/CompanyOverviewMockData.json',
};

export function useMockData<T>(fileName: MockFileName, fallbackData: T): T {
  const [data, setData] = useState<T>(fallbackData);

  useEffect(() => {
    if (cache[fileName]) {
      setData(cache[fileName]);
      return;
    }

    const loadData = async () => {
      try {
        const location = fileLocations[fileName];
        const imported = await import(/* @vite-ignore */ location);

        cache[fileName] = imported.default || imported;
        setData(cache[fileName]);
      } catch (err) {
        console.error(`Failed to load mock data: ${fileName}`, err);
        // Fallback is already set
      }
    };

    loadData();
  }, [fileName]);

  return data;
}
