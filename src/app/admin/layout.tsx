// src/app/admin/layout.tsx
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import Sidebar from './_components/Sidebar'
import LogoutButton from './logoutButton'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  )

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-brand-text">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="flex justify-between items-center px-8 py-3.5 bg-white border-b border-gray-200 sticky top-0 z-30">
          <p className="text-sm text-gray-400 font-medium">
            Panel de administración
          </p>
          <LogoutButton />
        </header>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
