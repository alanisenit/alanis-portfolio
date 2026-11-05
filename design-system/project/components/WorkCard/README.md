# WorkCard

Miniatura de proyecto al estilo del anuario de CalArts: imagen recortada 5:6, etiqueta de categoría a la izquierda y nombre grande a la derecha.

- **Provee:** imagen de portada con `alt` descriptivo ("Macbeth: carteles teatrales"), categoría principal, nombre del proyecto y enlace a su página (`/trabajo/<slug>`).
- Va siempre sobre `white` dentro de `pn-grid` (4 columnas; 3 bajo `bp-xl`; 2 bajo `bp-md`).
- Esquinas rectas. Al pasar el mouse la imagen crece un 4,5% y aparece la píldora "Ver proyecto".
- Al hacer clic abre `ProjectModal`; con Ctrl/Cmd abre la página del caso. Nunca recortes dentro de la ventana o del caso: ahí la pieza va completa.
- En móvil (< `bp-sm`) el nombre baja debajo de la etiqueta y se alinea a la izquierda.
