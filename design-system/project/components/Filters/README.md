# Filters

Herramientas de la página de trabajo: orden, buscador y filtros por #hashtag.

- **Orden:** `select` con "Destacados" y "A–Z", subrayado `ink` de 2,5px.
- **Buscador:** borde `ink` de 1,5px, 54px de alto, busca en nombre, subtítulo y categoría sin distinguir acentos. Foco: `focus-ring` en todo el campo.
- **#Hashtags:** botones con `aria-pressed`. El activo lleva subrayado `ink` de 3px y un marcador `honey` detrás del texto (el estado no depende solo del amarillo).
- **Provee:** las mismas seis categorías de `Tag` más #Todo, y un contador vivo ("12 proyectos", `aria-live="polite"`).
- Con cero resultados, decir cómo salir: "No hay proyectos con ese filtro. Prueba con otra palabra o elige #Todo".
