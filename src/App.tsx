import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/Home/HomePage';
import JobsPage from './pages/Jobs/JobsPage';
import JobDetailPage from './pages/JobDetails/JobDetailsPage';
import CompaniesPage from './pages/Companies/CompaniesPage';
import CompanyOverviewPage from './pages/CompanyOverview/CompanyOverviewPage';
import CandidateDashboard from './pages/CandidateDashboard/CandidateDashboardPage';
import EmployerDashboard from './pages/EmployerDashboard/EmployerDashboardPage';
import AdminDashboard from './pages/AdminDashboard/AdminDashboardPage';
import SandboxPage from './pages/Sandbox/SandboxPage';
import ChatPage from './pages/Chat/ChatPage';
import CreateTaskPage from './pages/CreateTask/CreateTaskPage';
import CreateCompanyPage from './pages/EmployerDashboard/CreateCompanyPage';
import SolutionViewPage from './pages/SolutionView/SolutionViewPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import UserProfilePage from './pages/UserProfile/UserProfilePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes without global layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Main app routes with global layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/companies/:id" element={<CompanyOverviewPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/dashboard" element={<CandidateDashboard />} />
          <Route path="/employer" element={<EmployerDashboard />} />
          <Route path="/employer/companies/new" element={<CreateCompanyPage />} />
          <Route path="/employer/tasks/new" element={<CreateTaskPage />} />
          <Route path="/employer/solutions/:id" element={<SolutionViewPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/sandbox" element={<SandboxPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
