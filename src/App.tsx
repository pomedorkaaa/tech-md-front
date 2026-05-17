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
import CreateJobPage from './pages/EmployerDashboard/CreateJobPage';
import TestResultDetailsPage from './pages/EmployerDashboard/TestResultDetailsPage';
import SolutionViewPage from './pages/SolutionView/SolutionViewPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import OAuthCallbackPage from './pages/Auth/OAuthCallbackPage';
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/Auth/ResetPasswordPage';
import UserProfilePage from './pages/UserProfile/UserProfilePage';
import SettingsPage from './pages/Settings/SettingsPage';
import NotificationsPage from './pages/Notifications/NotificationsPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import ManageJobsPage from './pages/EmployerDashboard/ManageJobsPage';
import ManageCompaniesPage from './pages/EmployerDashboard/ManageCompaniesPage';
import ManageTasksPage from './pages/EmployerDashboard/ManageTasksPage';
import AboutPage from './pages/Static/AboutPage';
import SupportPage from './pages/Static/SupportPage';
import BlogPage from './pages/Static/BlogPage';
import TermsPage from './pages/Static/TermsPage';
import PrivacyPage from './pages/Static/PrivacyPage';
import CookiesPage from './pages/Static/CookiesPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes without global layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/auth/callback/:provider" element={<OAuthCallbackPage />} />

        {/* Main app routes with global layout */}
        <Route element={<Layout />}>
          {/* Публичные страницы */}
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/companies/:id" element={<CompanyOverviewPage />} />
          <Route path="/sandbox" element={<SandboxPage />} />
          
          <Route path="/about" element={<AboutPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/cookies" element={<CookiesPage />} />

          {/* Маршруты для всех авторизованных пользователей */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
          </Route>

          {/* Маршруты для кандидатов */}
          <Route element={<ProtectedRoute allowedRoles={['candidate', 'admin']} />}>
            <Route path="/dashboard" element={<CandidateDashboard />} />
          </Route>

          {/* Маршруты для работодателей */}
          <Route element={<ProtectedRoute allowedRoles={['employer', 'admin']} />}>
            <Route path="/employer" element={<EmployerDashboard />} />
            <Route path="/employer/jobs" element={<ManageJobsPage />} />
            <Route path="/employer/jobs/new" element={<CreateJobPage />} />
            <Route path="/employer/companies" element={<ManageCompaniesPage />} />
            <Route path="/employer/companies/new" element={<CreateCompanyPage />} />
            <Route path="/employer/tasks" element={<ManageTasksPage />} />
            <Route path="/employer/tasks/new" element={<CreateTaskPage />} />
            <Route path="/employer/tests/:id" element={<TestResultDetailsPage />} />
            <Route path="/employer/solutions/:id" element={<SolutionViewPage />} />
          </Route>

          {/* Маршруты для администраторов */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
