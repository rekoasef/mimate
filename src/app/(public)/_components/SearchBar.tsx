'use client'

import { useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';

export default function SearchBar({ initialValue = '' }: { initialValue?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleSearch = (value: string) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', '1');
      if (value.trim()) {
        params.set('q', value.trim());
      } else {
        params.delete('q');
      }
      router.push(`${pathname}?${params.toString()}`);
    }, 380);
  };

  return (
    <div className="relative w-full">
      <FiSearch
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none"
        size={18}
      />
      <input
        type="search"
        defaultValue={initialValue}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Buscar mates..."
        className="w-full bg-white/10 backdrop-blur-sm text-white placeholder-white/40 border border-white/20 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all text-sm"
      />
    </div>
  );
}
