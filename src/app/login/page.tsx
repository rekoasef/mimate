// src/app/login/page.tsx
import LoginForm from './loginForm';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image src="/logo.png" alt="Mimate" width={180} height={65} priority />
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-brand-secondary">Bienvenido</h1>
            <p className="text-sm text-gray-400 mt-1">Ingresá para acceder al panel</p>
          </div>
          <LoginForm />
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Mimate — Panel de administración
        </p>
      </div>
    </div>
  );
}
