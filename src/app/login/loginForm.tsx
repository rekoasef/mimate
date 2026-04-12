'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Email o contraseña incorrectos.')
      setLoading(false)
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  const inputClass = 'w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-brand-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-colors'
  const labelClass = 'block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5'

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label className={labelClass} htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          className={inputClass}
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>
          </svg>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-xl hover:bg-brand-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
      >
        {loading ? 'Ingresando...' : 'Iniciar sesión'}
      </button>
    </form>
  )
}
