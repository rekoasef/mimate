// src/app/(public)/_components/Footer.tsx
export default function Footer() {
  return (
    // CAMBIOS: Eliminado bg-brand-surface, añadido mt-12, texto blanco/opaco
    <footer className="mt-12 py-6 border-t border-gray-200/30"> {/* Borde superior sutil */}
      <div className="container mx-auto px-6 text-center text-white/70 text-sm"> {/* Texto blanco con opacidad */}
        <p>&copy; {new Date().getFullYear()} Mimate. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}