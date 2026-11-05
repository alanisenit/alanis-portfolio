# TopBar

Barra fija de navegación sobre `bar`, con el logotipo, cuatro botones-caja, el idioma y el botón Hablemos.

- **Provee:** las cuatro páginas en este orden (Trabajo, Servicios, Sobre mí, Contacto) y `aria-current="page"` en la actual.
- **Activo:** caja en `honey` con una barra inferior de 4px en `ink`, para que el estado no dependa solo del color. Hover en `mint`.
- **Hablemos:** borde y texto `honey`; se rellena al pasar el mouse. Lleva a Contacto.
- **Logotipo:** asterisco `pink` + "Alanis Romero" en dos líneas con `display` a 17px. No hay otro logotipo.
- **Móvil (< `bp-md`):** logotipo y Hablemos arriba, las cuatro cajas en una fila de cuatro columnas debajo.
- No agregar más de cuatro cajas ni iconos dentro de ellas. Posición `sticky` con `z-top`.
