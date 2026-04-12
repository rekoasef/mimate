'use client'

import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  currentPage: number;
}

export default function PaginationControls({ hasNextPage, hasPrevPage, currentPage }: PaginationControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigate = (newPage: number) => {
    // Preserve all existing params — only replace 'page'
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));
    router.push(`/catalogo?${params.toString()}`);
  };

  return (
    <div className="flex gap-4 justify-center items-center mt-12">
      <button
        className="bg-white/10 backdrop-blur-sm border border-white/20 text-white py-2.5 px-5 rounded-xl font-semibold text-sm disabled:opacity-30 hover:bg-white/20 transition-colors"
        disabled={!hasPrevPage}
        onClick={() => navigate(currentPage - 1)}
      >
        ‹ Anterior
      </button>

      <div className="text-sm text-white/70 font-medium px-2">
        Página {currentPage}
      </div>

      <button
        className="bg-white/10 backdrop-blur-sm border border-white/20 text-white py-2.5 px-5 rounded-xl font-semibold text-sm disabled:opacity-30 hover:bg-white/20 transition-colors"
        disabled={!hasNextPage}
        onClick={() => navigate(currentPage + 1)}
      >
        Siguiente ›
      </button>
    </div>
  );
}
