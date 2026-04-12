'use client'

import { useState, useCallback, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { FiFilter, FiX } from 'react-icons/fi';

type Category = { id: number; name: string };

interface CatalogFiltersProps {
  categories: Category[];
}

export default function CatalogFilters({ categories }: CatalogFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // URL-driven state (instant apply)
  const selectedCategory = searchParams.get('categoria') || '';
  const sort = searchParams.get('sort') || '';
  const featured = searchParams.get('destacados') === '1';

  // Local state for price — only pushed to URL on blur/Enter
  const [localMin, setLocalMin] = useState(searchParams.get('min_price') || '');
  const [localMax, setLocalMax] = useState(searchParams.get('max_price') || '');

  // Keep local price in sync when URL changes externally (e.g. "limpiar filtros")
  useEffect(() => {
    setLocalMin(searchParams.get('min_price') || '');
    setLocalMax(searchParams.get('max_price') || '');
  }, [searchParams]);

  const hasFilters = !!(
    selectedCategory ||
    searchParams.get('min_price') ||
    searchParams.get('max_price') ||
    sort ||
    featured
  );

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', '1');
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const applyPriceRange = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');

    if (localMin) {
      params.set('min_price', localMin);
    } else {
      params.delete('min_price');
    }
    if (localMax) {
      params.set('max_price', localMax);
    } else {
      params.delete('max_price');
    }
    router.push(`${pathname}?${params.toString()}`);
  }, [router, pathname, searchParams, localMin, localMax]);

  const clearAll = useCallback(() => {
    setLocalMin('');
    setLocalMax('');
    router.push(pathname);
    setDrawerOpen(false);
  }, [router, pathname]);

  // ── Shared filter JSX (inlined, not a nested component) ──
  const filterBody = (
    <div className="space-y-7">

      {/* Sort */}
      <div>
        <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-3 opacity-70">
          Ordenar por
        </h3>
        <select
          value={sort}
          onChange={(e) => updateParam('sort', e.target.value)}
          className="w-full bg-white/10 text-white border border-white/20 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary appearance-none cursor-pointer"
        >
          <option value="" className="text-black bg-white">Más recientes</option>
          <option value="price_asc" className="text-black bg-white">Precio: menor a mayor</option>
          <option value="price_desc" className="text-black bg-white">Precio: mayor a menor</option>
        </select>
      </div>

      {/* Category */}
      {categories.length > 0 && (
        <div>
          <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-3 opacity-70">
            Categoría
          </h3>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => updateParam('categoria', '')}
              className={`text-left text-sm px-3 py-2 rounded-xl transition-colors font-medium ${
                !selectedCategory
                  ? 'bg-brand-primary text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              Todos
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => updateParam('categoria', cat.id.toString())}
                className={`text-left text-sm px-3 py-2 rounded-xl transition-colors font-medium ${
                  selectedCategory === String(cat.id)
                    ? 'bg-brand-primary text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price range */}
      <div>
        <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-3 opacity-70">
          Rango de precio
        </h3>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Mín $"
            value={localMin}
            onChange={(e) => setLocalMin(e.target.value)}
            onBlur={applyPriceRange}
            onKeyDown={(e) => e.key === 'Enter' && applyPriceRange()}
            className="w-full bg-white/10 text-white placeholder-white/40 border border-white/20 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
          <span className="text-white/40 shrink-0">—</span>
          <input
            type="number"
            placeholder="Máx $"
            value={localMax}
            onChange={(e) => setLocalMax(e.target.value)}
            onBlur={applyPriceRange}
            onKeyDown={(e) => e.key === 'Enter' && applyPriceRange()}
            className="w-full bg-white/10 text-white placeholder-white/40 border border-white/20 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
        </div>
        <p className="text-white/30 text-xs mt-2">Presioná Enter o hacé click afuera para aplicar</p>
      </div>

      {/* Featured toggle */}
      <div>
        <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-3 opacity-70">
          Colección
        </h3>
        <button
          onClick={() => updateParam('destacados', featured ? '' : '1')}
          className="flex items-center gap-3 w-full cursor-pointer group/toggle"
        >
          <div
            className={`relative w-10 h-6 rounded-full transition-colors duration-200 ${
              featured ? 'bg-brand-primary' : 'bg-white/20'
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                featured ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </div>
          <span className="text-white/80 text-sm font-medium group-hover/toggle:text-white transition-colors">
            Solo destacados
          </span>
        </button>
      </div>

      {/* Clear */}
      {hasFilters && (
        <button
          onClick={clearAll}
          className="w-full text-sm text-red-300 hover:text-red-200 transition-colors underline underline-offset-2 text-center pt-1"
        >
          Limpiar todos los filtros
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* ── Mobile: trigger button ── */}
      <div className="lg:hidden">
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow border border-white/20 transition-colors"
        >
          <FiFilter size={16} />
          Filtros
          {hasFilters && (
            <span className="bg-brand-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold leading-none">
              •
            </span>
          )}
        </button>
      </div>

      {/* ── Desktop: sidebar ── */}
      <aside className="hidden lg:block w-56 xl:w-64 shrink-0">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 sticky top-24 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white font-bold text-base flex items-center gap-2">
              <FiFilter size={15} />
              Filtros
            </h2>
            {hasFilters && (
              <button
                onClick={clearAll}
                className="text-xs text-white/50 hover:text-white transition-colors underline underline-offset-2"
              >
                Limpiar
              </button>
            )}
          </div>
          {filterBody}
        </div>
      </aside>

      {/* ── Mobile: drawer ── */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative ml-auto w-80 max-w-[90vw] bg-brand-secondary h-full overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-7">
              <h2 className="text-white font-bold text-xl">Filtros</h2>
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-white/60 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              >
                <FiX size={22} />
              </button>
            </div>
            {filterBody}
            <button
              onClick={() => setDrawerOpen(false)}
              className="mt-8 w-full bg-brand-primary hover:bg-opacity-90 text-white py-3.5 rounded-xl font-bold text-base transition-colors"
            >
              Ver resultados
            </button>
          </div>
        </div>
      )}
    </>
  );
}
