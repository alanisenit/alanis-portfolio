# Logo

El logotipo Enit Designs: letras script del logo original sobre cuatro piezas de color que se arman.

- **Provee:** el SVG con las letras (`enit-E`, `enit-nit`, `enit-designs` en un `<defs>` de la página) y las piezas con clases `pc-square`, `pc-tri`, `pc-quad`, `pc-circle`; el asterisco del punto de la i va en `.ast`.
- **Barra:** quieto, 58px de alto (46px bajo `bp-md`), dentro de un enlace al inicio con `aria-label="Enit Designs · Alanis Romero, inicio"`. Al pasar el mouse las piezas se separan apenas y el asterisco gira 180°.
- **Cierre:** versión animada (`.enit-anim`): piezas sueltas que flotan y se arman cuando el logo entra en pantalla; al pasar el mouse se separan otra vez. Decorativa: `aria-hidden="true"`.
- **Chico:** debajo de 120px de ancho, usar el monograma.
- No cambiar colores, no estirar, no quitar el contorno `night` de las letras. Con `prefers-reduced-motion` el logo queda armado y quieto.
