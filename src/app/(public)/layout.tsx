/* Opción B‑v2: no se hace cover, escala fija en px y
   se repite SOLO en vertical para que no se corte. */

:root {
  /* Escala de la ilustración */
  --bg-width-mobile: 1400px;   /* móvil (te funcionó bien) */
  --bg-width-desktop: 1600px;  /* ↓ bajá este valor para ver iconos más chicos en desktop */

  /* Encuadre */
  --bg-pos-mobile: center top;
  --bg-pos-desktop: center top;
}

.public-layout {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100svh;
  color: white;

  background-image: url('/background-desktop-pattern.jpg');

  /* Clave de B-v2 */
  background-repeat: repeat-y;             /* para que no se corte hacia abajo */
  background-position: var(--bg-pos-mobile);
  background-size: var(--bg-width-mobile) auto;

  background-attachment: scroll;           /* iOS safe */
}

@media (min-width: 768px) {
  .public-layout {
    background-position: var(--bg-pos-desktop);
    background-size: var(--bg-width-desktop) auto;

    /* Podés dejarlo scroll si no querés parallax */
    background-attachment: fixed;
  }
}

/* iOS Safari */
@supports (-webkit-touch-callout: none) {
  .public-layout {
    background-attachment: scroll !important;
  }
}

/* Accesibilidad */
@media (prefers-reduced-motion: reduce) {
  .public-layout {
    background-attachment: scroll !important;
  }
}
