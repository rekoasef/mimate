'use client'

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/>
        <rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>
      </svg>
    ),
    exact: true,
  },
  {
    href: '/admin/products',
    label: 'Productos',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
        <path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
  },
  {
    href: '/admin/categories',
    label: 'Categorías',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-brand-secondary flex flex-col min-h-screen">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-white/10">
        <Link href="/admin">
          <Image src="/logo.png" alt="Mimate" width={160} height={120} priority className="brightness-0 invert opacity-90" />
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-white/50'}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: ver sitio */}
      <div className="px-3 pb-5">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs text-white/40 hover:text-white/70 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/>
          </svg>
          Ver sitio público
        </Link>
      </div>
    </aside>
  );
}
