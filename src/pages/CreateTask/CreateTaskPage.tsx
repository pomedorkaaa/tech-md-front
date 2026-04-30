import { useState } from 'react';
import TaskHeader from '../../components/CreateTask/TaskHeader';
import ProgressBar from '../../components/CreateTask/ProgressBar';
import MainInfoForm from '../../components/CreateTask/MainInfoForm';
import DescriptionEditor from '../../components/CreateTask/DescriptionEditor';
import FormActions from '../../components/CreateTask/FormActions';
import ConstraintsWidget from '../../components/CreateTask/ConstraintsWidget';
import TestCasesSample from '../../components/CreateTask/TestCasesSample';
import GuidelineCard from '../../components/CreateTask/GuidelineCard';

export default function CreateTaskPage() {
  const [taskData, setTaskData] = useState({
    title: '',
    difficulty: '',
    category: 'algos',
    tags: ['Binary Search', 'Recursion'],
    description: '',
    timeLimit: 2.0,
    memoryLimit: 256
  });

  const updateTaskData = (updates: Partial<typeof taskData>) => {
    setTaskData(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <TaskHeader />
      <ProgressBar />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <MainInfoForm 
            data={taskData} 
            onChange={updateTaskData} 
          />
          <DescriptionEditor 
            value={taskData.description} 
            onChange={(val) => updateTaskData({ description: val })} 
          />
          <FormActions />
        </div>

        <div className="lg:col-span-1 space-y-8">
          <ConstraintsWidget 
            timeLimit={taskData.timeLimit}
            memoryLimit={taskData.memoryLimit}
            onChange={updateTaskData}
          />
          <TestCasesSample />
          <GuidelineCard />
        </div>
      </div>
    </div>
  );
}
