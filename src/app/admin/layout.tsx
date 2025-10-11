// src/app/admin/layout.tsx
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
    <div className="flex min-h-screen bg-brand-bg text-brand-text">
      <aside className="w-64 bg-brand-surface p-4 border-r border-gray-200">
        <div className="mb-8">
          <Link href="/admin">
            <Image src="/logo.png" alt="Logo Mimate" width={150} height={50} priority />
          </Link>
        </div>
        <nav>
          <ul className="space-y-2">
            <li><Link href="/admin" className="block p-2 rounded hover:bg-brand-bg">Dashboard</Link></li>
            <li><Link href="/admin/categories" className="block p-2 rounded hover:bg-brand-bg">Categorías</Link></li>
            <li><Link href="/admin/products" className="block p-2 rounded hover:bg-brand-bg">Productos</Link></li>
          </ul>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="flex justify-end items-center p-4 border-b border-gray-200 bg-brand-surface">
          <LogoutButton />
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}