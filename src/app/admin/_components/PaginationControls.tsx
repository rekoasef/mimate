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
  pageSize,
}: PaginationControlsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  const start = (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, totalProducts)

  return (
    <div className="flex justify-between items-center mt-6 px-1">
      <p className="text-sm text-gray-400">
        Mostrando <span className="font-semibold text-gray-600">{start}–{end}</span> de{' '}
        <span className="font-semibold text-gray-600">{totalProducts}</span> productos
      </p>
      <div className="flex gap-2">
        <button
          className="px-4 py-2 text-sm font-medium border border-gray-200 bg-white text-gray-600 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          disabled={!hasPrevPage}
          onClick={() => router.push(createPageURL(page - 1))}
        >
          ← Anterior
        </button>
        <button
          className="px-4 py-2 text-sm font-medium border border-gray-200 bg-white text-gray-600 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          disabled={!hasNextPage}
          onClick={() => router.push(createPageURL(page + 1))}
        >
          Siguiente →
        </button>
      </div>
    </div>
  )
}
