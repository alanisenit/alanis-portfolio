# ProjectModal

Ventana de proyecto que se abre desde la rejilla sin salir de ella: barra del color de la categoría, título sobre `night`, descripción, etiquetas e imágenes completas.

- **Provee:** título, subtítulo (va a mano en `green-lite`), descripción de una o dos frases, todas las categorías, 1–4 imágenes con `alt` y, si existe, el enlace "Ver caso completo".
- Se monta en `position:fixed` con `z-modal` sobre el velo `scrim`; entra con `dur-modal` (sube 48px). Escape y el botón ✕ la cierran; el foco queda atrapado dentro y vuelve a la tarjeta al cerrar.
- En Next.js: ruta interceptada, para que cada proyecto tenga también su URL indexable (`/trabajo/<slug>`).
- Esquinas rectas, como las miniaturas.
