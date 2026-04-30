import AuthLayout from '../../components/Auth/AuthLayout';
import LoginForm from '../../components/Auth/LoginForm';

export default function LoginPage() {
  return (
    <AuthLayout subtitle="The heart of the local IT ecosystem.">
      <LoginForm />
    </AuthLayout>
  );
}
