// src/app/login/loginForm.tsx
'use client'

import { createBrowserClient } from '@supabase/ssr' // Importación actualizada
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Nueva forma de crear el cliente en el navegador
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
     <form onSubmit={handleLogin} className="space-y-4 w-full max-w-sm">
      <div>
        <label className="block mb-2 text-sm font-medium text-brand-text" htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 border border-brand-bg rounded-md text-brand-text" />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-brand-text" htmlFor="password">Contraseña</label>
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-2 border border-brand-bg rounded-md text-brand-text" />
      </div>
      <button type="submit" className="w-full p-2 bg-brand-primary rounded-md text-brand-text-light hover:bg-brand-primary/90">
        Iniciar Sesión
      </button>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </form>
  )
}