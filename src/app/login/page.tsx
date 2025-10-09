// src/app/login/page.tsx
import LoginForm from './loginForm';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-brand-surface rounded-lg shadow-lg">
        <div className="flex justify-center">
            {/* Usamos el logo principal aquí. Si tuvieras una versión oscura, 
                podrías cambiar el 'src' dependiendo del tema. 
            */}
            <Image src="/logo.png" alt="Mimate Logo" width={180} height={60} />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}