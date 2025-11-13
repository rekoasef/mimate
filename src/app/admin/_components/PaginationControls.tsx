// src/app/admin/_components/PaginationControls.tsx
'use client'

import { usePathname, useSearchParams, useRouter } from 'next/navigation'

interface PaginationControlsProps {
  hasNextPage: boolean
  hasPrevPage: boolean
  totalProducts: number
  pageSize: number
}

export default function PaginationControls({
  hasNextPage,
  hasPrevPage,
  totalProducts,
  pageSize
}: PaginationControlsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  const start = (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, totalProducts)

  return (
    <div className="flex justify-between items-center mt-6">
      <p className="text-sm text-gray-500">
        Mostrando {start} a {end} de {totalProducts} productos
      </p>
      <div className="flex gap-2">
        <button
          className="bg-brand-surface border border-gray-300 text-brand-text py-2 px-4 rounded-md disabled:opacity-50"
          disabled={!hasPrevPage}
          onClick={() => router.push(createPageURL(page - 1))}
        >
          Anterior
        </button>
        <button
          className="bg-brand-surface border border-gray-300 text-brand-text py-2 px-4 rounded-md disabled:opacity-50"
          disabled={!hasNextPage}
          onClick={() => router.push(createPageURL(page + 1))}
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}