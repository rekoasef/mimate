// src/app/(public)/_components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-brand-surface mt-12 py-6">
      <div className="container mx-auto px-6 text-center text-brand-text">
        <p>&copy; {new Date().getFullYear()} Mimate. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}