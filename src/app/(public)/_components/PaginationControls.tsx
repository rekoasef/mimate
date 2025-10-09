// src/app/(public)/_components/PaginationControls.tsx
'use client'

import { useSearchParams, useRouter } from 'next/navigation'

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export default function PaginationControls({ hasNextPage, hasPrevPage }: PaginationControlsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const per_page = searchParams.get('per_page') ?? '8'

  return (
    <div className="flex gap-4 justify-center items-center mt-12">
      <button
        className="bg-brand-surface border border-gray-200 text-brand-text py-2 px-4 rounded-md disabled:opacity-50"
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/catalogo?page=${Number(page) - 1}`)
        }}
      >
        ‹ Anterior
      </button>

      <div className="text-sm">
        Página {page}
      </div>

      <button
        className="bg-brand-surface border border-gray-200 text-brand-text py-2 px-4 rounded-md disabled:opacity-50"
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/catalogo?page=${Number(page) + 1}`)
        }}
      >
        Siguiente ›
      </button>
    </div>
  )
}